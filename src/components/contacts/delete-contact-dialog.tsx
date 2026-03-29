'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@next-template/ui/components/ui/alert-dialog';
import { Button } from '@next-template/ui/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface DeleteContactDialogProps {
  contactName: string;
  onConfirm: () => void;
}

export const DeleteContactDialog = ({ contactName, onConfirm }: DeleteContactDialogProps) => {
  const tc = useTranslations('contacts');
  const tCommon = useTranslations('common');

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>
        <Trash2 className="size-3.5" aria-hidden="true" />
        {tCommon('delete')}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{tc('deleteTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {tc('deleteConfirmation', { name: contactName })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tCommon('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{tCommon('delete')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
