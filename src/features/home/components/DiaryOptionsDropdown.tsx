import {
  getGetCalendarViewQueryKey,
  getGetCurrentStreakQueryKey,
  getGetDailySummaryQueryKey,
  getGetFeedQueryKey,
  useDeleteDiary,
} from '@/src/apis/_generated/serverAPI';
import { Dropdown } from '@/src/core/Dropdown';
import { Body2 } from '@/src/core/Txt';
import DeleteDiaryConfirmModal from '@/src/features/home/components/DeleteDiaryConfirmModal';
import { useModal } from '@/src/modules/modal';
import { toast } from '@/src/modules/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

type Props = {
  diaryId: number;
  year: number;
  month: number;
  day: number;
};

const DiaryOptionsDropdown = ({ diaryId, year, month, day }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteModal = useModal();
  const deleteDiaryMutation = useDeleteDiary();

  const handleDeleteConfirmClick = () => {
    if (deleteDiaryMutation.isPending) return;
    deleteDiaryMutation.mutate(
      { diaryId },
      {
        onSuccess: () => {
          toast({ message: '삭제되었습니다.', options: { type: 'success' } });
          queryClient.invalidateQueries({ queryKey: getGetCalendarViewQueryKey({ year, month }) });
          queryClient.invalidateQueries({ queryKey: getGetDailySummaryQueryKey({ year, month, day }) });
          queryClient.invalidateQueries({ queryKey: getGetFeedQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetCurrentStreakQueryKey() });
          router.dismissAll();
        },
        onError: () => {
          toast({ message: '삭제에 실패했습니다. 잠시 후 다시 시도해주세요.', options: { type: 'error' } });
        },
      }
    );
  };

  const handleEditClick = () => {
    router.navigate(`/edit-diary?diaryId=${diaryId}&year=${year}&month=${month}&day=${day}`);
  };

  const handleDeleteClick = () => {
    deleteModal.open(({ isOpen, exit }) => (
      <DeleteDiaryConfirmModal
        isOpen={isOpen}
        isPending={deleteDiaryMutation.isPending}
        onConfirm={handleDeleteConfirmClick}
        onClose={exit}
      />
    ));
  };

  return (
    <Dropdown>
      <Dropdown.Trigger />
      <Dropdown.Menu align="end">
        <Dropdown.Item onPress={handleEditClick}>
          <DropdownItemText>수정</DropdownItemText>
        </Dropdown.Item>
        <Dropdown.Item onPress={handleDeleteClick}>
          <DropdownItemText>삭제</DropdownItemText>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DiaryOptionsDropdown;

const DropdownItemText = styled(Body2)`
  color: ${({ theme }) => theme.title};
`;
