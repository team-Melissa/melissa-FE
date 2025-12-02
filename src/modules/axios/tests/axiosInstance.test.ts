import { removeAccessToken, setAccessToken } from "@/src/libs/mmkv";
import { removeRefreshToken, setRefreshToken } from "@/src/libs/secureStorage";
import { router } from "expo-router";
import { rest } from "msw";
import { setupServer } from "msw/node";
import axiosInstance from "../instance";

let mockAccessToken = "expired-at";
let mockRefreshToken = "valid-rt";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));
jest.mock("@/src/libs/secureStorage", () => ({
  getRefreshToken: jest.fn(() => mockRefreshToken),
  setRefreshToken: jest.fn((token: string) => (mockRefreshToken = token)),
  removeRefreshToken: jest.fn(),
}));
jest.mock("@/src/libs/mmkv", () => ({
  getAccessToken: jest.fn(() => mockAccessToken),
  setAccessToken: jest.fn((token: string) => (mockAccessToken = token)),
  removeAccessToken: jest.fn(),
}));
jest.mock("@/src/modules/axios/apis/getNewToken", () => ({
  getNewToken: jest.fn(async (refreshToken: string) => {
    if (refreshToken === "valid-rt") {
      return {
        result: {
          tokenType: "Bearer",
          accessToken: "valid-at",
          refreshToken: "new-rt",
        },
      };
    }

    throw new Error("Invalid refresh token");
  }),
}));

const mockServer = setupServer(
  rest.get("http://localhost/api/test1", (req, res, ctx) => {
    const accessToken = req.headers.get("authorization");

    if (accessToken !== "Bearer valid-at") {
      return res(ctx.status(401), ctx.json({ message: "unauthorized" }));
    }

    return res(ctx.status(200), ctx.json({ message: "success" }));
  })
);

beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());
beforeEach(() => {
  mockAccessToken = "expired-at";
  mockRefreshToken = "valid-rt";
  jest.clearAllMocks();
});
afterEach(() => mockServer.resetHandlers());

describe("access token 자동 재발급 테스트", () => {
  it("단일 401 처리", async () => {
    const res = await axiosInstance.get("/api/test1");

    expect(res.data.message).toBe("success");
    expect(setAccessToken).toHaveBeenCalledWith("valid-at");
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
    expect(setAccessToken).toHaveBeenCalledWith("valid-at");
    expect(setRefreshToken).toHaveBeenCalledWith("new-rt");
  });

  it("access token이 없는 채로 요청", async () => {
    mockAccessToken = "";

    const res = await axiosInstance.get("/api/test1");

    expect(res.data.message).toBe("success");
    expect(setAccessToken).toHaveBeenCalledWith("valid-at");
    expect(setRefreshToken).toHaveBeenCalledWith("new-rt");
  });

  it("refresh token이 없는 경우", async () => {
    mockRefreshToken = "";

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
