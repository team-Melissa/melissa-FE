import { toast } from '@/src/modules/toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Params = {
  message: string;
  email: string;
};

const EMAILJS_SERVICE_ID = 'service_c6kbskr';
const EMAILJS_TEMPLATE_ID = 'template_10o3anp';
const EMAILJS_PUBLIC_KEY = 'TbLHQpGzsEF9MhRJi';
const EMAILJS_ACCESS_TOKEN = process.env.EXPO_PUBLIC_EMAILJS_ACCESS_TOKEN;

const sendEmail = async ({ message, email }: Params) => {
  const { data } = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    accessToken: EMAILJS_ACCESS_TOKEN,
    template_params: {
      name: email,
      email,
      message,
    },
  });

  return data;
};

export const useSendEmailMutation = () => {
  return useMutation({
    mutationFn: sendEmail,
    onSuccess: () => toast({ message: '의견이 접수되었습니다.', options: { type: 'success' } }),
    onError: () => toast({ message: '의견 전송 중 문제가 발생했습니다.', options: { type: 'error' } }),
  });
};
