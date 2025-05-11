import { rest } from "msw";
import { setupServer } from "msw/node";
import { setRefreshToken, removeRefreshToken } from "@/src/libs/secureStorage";
import { setAccessToken, removeAccessToken } from "@/src/libs/mmkv";
import axiosInstance from "@/src/libs/axiosInstance";
import { router } from "expo-router";

let mockCurAccessToken = "expired-at";
let mockCurRefreshToken = "valid-rt";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));
jest.mock("../../src/libs/secureStorage", () => ({
  getRefreshToken: jest.fn(() => mockCurRefreshToken),
  setRefreshToken: jest.fn((token: string) => (mockCurRefreshToken = token)),
  removeRefreshToken: jest.fn(),
}));
jest.mock("../../src/libs/mmkv", () => ({
  getAccessToken: jest.fn(() => mockCurAccessToken),
  setAccessToken: jest.fn((token: string) => (mockCurAccessToken = token)),
  removeAccessToken: jest.fn(),
}));

const server = setupServer(
  rest.get("http://localhost/api/test1", (req, res, ctx) => {
    console.log(`GET ${req.headers.get("authorization")}`);
    const token = req.headers.get("authorization");
    if (token !== "Bearer valid-at") return res(ctx.status(401), ctx.json({ message: "unauthorized" }));
    return res(ctx.status(200), ctx.json({ message: "success" }));
  }),

  rest.post("http://localhost/api/v1/auth/refresh", async (req, res, ctx) => {
    const { refreshToken } = await req.json();
    if (refreshToken === "valid-rt")
      return res(
        ctx.status(200),
        ctx.json({ result: { tokenType: "Bearer", accessToken: "valid-at", refreshToken: "new-rt" } })
      );
    return res(ctx.status(401), ctx.json({ result: { message: "unauthorized" } }));
  })
);

beforeAll(() => server.listen());
beforeEach(() => {
  mockCurAccessToken = "expired-at";
  mockCurRefreshToken = "valid-rt";
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("access token 자동 재발급 테스트", () => {
  it("단일 401 처리", async () => {
    const res = await axiosInstance.get("/api/test1");

    expect(res.data.message).toBe("success");
    // toHaveBeenCalledWith: mocking 함수가 받은 값이 뭔지 확인하는 함수
    expect(setAccessToken).toHaveBeenCalledWith("Bearer valid-at");
    expect(setRefreshToken).toHaveBeenCalledWith("new-rt");
  });

  it("동시에 여러 요청 발생 시 401 처리", async () => {
    const [res1, res2, res3, res4, res5] = await Promise.all([
      axiosInstance.get("/api/test1"),
      axiosInstance.get("/api/test1"),
      axiosInstance.get("/api/test1"),
      axiosInstance.get("/api/test1"),
      axiosInstance.get("/api/test1"),
    ]);

    expect(res1.data.message).toBe("success");
    expect(res2.data.message).toBe("success");
    expect(res3.data.message).toBe("success");
    expect(res4.data.message).toBe("success");
    expect(res5.data.message).toBe("success");
    expect(setAccessToken).toHaveBeenCalledWith("Bearer valid-at");
  });

  it("access token이 없는 채로 요청", async () => {
    mockCurAccessToken = "";
    const res = await axiosInstance.get("/api/test1");

    expect(res.data.message).toBe("success");
    // toHaveBeenCalledWith: mocking 함수가 받은 값이 뭔지 확인하는 함수
    expect(setAccessToken).toHaveBeenCalledWith("Bearer valid-at");
    expect(setRefreshToken).toHaveBeenCalledWith("new-rt");
  });

  it("refresh token이 없는 경우", async () => {
    mockCurRefreshToken = "";
    await expect(axiosInstance.get("/api/test1")).rejects.toMatchObject({
      response: {
        status: 401,
        data: {
          message: "unauthorized",
        },
      },
    });

    expect(router.replace).toHaveBeenCalledWith("/login");
    expect(removeAccessToken).toHaveBeenCalled();
    expect(removeRefreshToken).toHaveBeenCalled();
  });
});
