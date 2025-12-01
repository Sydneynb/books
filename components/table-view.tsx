'use client';

import {
  CheckCircle,
  Edit,
  FileTextIcon,
  Loader2,
  PlayIcon,
  Trash2Icon,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';

interface Task {
  id: string;
  title: string;
  assignee: string;
  bookType: string;
  status: 'checked-in' | 'checked-out';
  dueDate: string;
  notes: string;
}

type TaskActionType = 'checkin' | 'checkout' | 'edit' | 'delete';

const tasks: Task[] = [
  {
    id: 'BOOK-001',
    title: 'The Great Gatsby',
    assignee: 'N/A',
    bookType: 'Classic',
    status: 'checked-in',
    dueDate: '2025-01-01',
    notes: 'Available on shelf A3',
  },
  {
    id: 'BOOK-002',
    title: '1984',
    assignee: 'Michael Torres',
    bookType: 'Dystopian',
    status: 'checked-out',
    dueDate: '2025-02-10',
    notes: 'Checked out for research - handle with care',
  },
  {
    id: 'BOOK-003',
    title: 'To Kill a Mockingbird',
    assignee: 'N/A',
    bookType: 'Classic',
    status: 'checked-in',
    dueDate: '2025-03-05',
    notes: 'New edition (2024)',
  },
  {
    id: 'BOOK-004',
    title: 'Sapiens: A Brief History of Humankind',
    assignee: 'Emma Rodriguez',
    bookType: 'Non-fiction',
    status: 'checked-out',
    dueDate: '2025-01-30',
    notes: 'Due back after book club meeting',
  },
  {
    id: 'BOOK-005',
    title: 'The Hobbit',
    assignee: 'N/A',
    bookType: 'Fantasy',
    status: 'checked-in',
    dueDate: '2025-04-12',
    notes: 'Classic fantasy - shelf B1',
  },
];

function getStatusBadge(status: Task['status']) {
  switch (status) {
    case 'checked-in':
      return (
        <Badge
          variant='outline'
          className='bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 border-0'
        >
          Checked In
        </Badge>
      );
    case 'checked-out':
      return (
        <Badge
          variant='outline'
          className='bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20 border-0'
        >
          Checked Out
        </Badge>
      );
    default:
      return <Badge variant='secondary'>{status}</Badge>;
  }
}

export default function TableView() {
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    type: TaskActionType;
  } | null>(null);

  const isTaskActionPending = (action: TaskActionType, taskId: string) =>
    pendingAction?.id === taskId && pendingAction.type === action;

  const isTaskBusy = (taskId: string) => pendingAction?.id === taskId;

  const handleAction = (task: Task, actionType: TaskActionType) => {
    setPendingAction({ id: task.id, type: actionType });
    setTimeout(() => {
      setPendingAction(null);
      console.log(`Action "${actionType}" completed for book:`, task.title);
    }, 1000);
  };

  const renderTaskRow = (task: Task) => {
    const busy = isTaskBusy(task.id);
    const checkinPending = isTaskActionPending('checkin', task.id);
    const checkoutPending = isTaskActionPending('checkout', task.id);
    const deletePending = isTaskActionPending('delete', task.id);
    const editPending = isTaskActionPending('edit', task.id);

    return (
      <TableRow key={task.id} className='hover:bg-muted/50'>
        <TableCell className='h-16 px-4 font-medium'>{task.title}</TableCell>
        <TableCell className='h-16 px-4 text-sm text-muted-foreground'>
          {task.assignee}
        </TableCell>

        <TableCell className='h-16 px-4 text-sm text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <span>{task.bookType}</span>
          </div>
        </TableCell>

        <TableCell className='h-16 px-4'>
          {getStatusBadge(task.status)}
        </TableCell>

        <TableCell className='h-16 px-4 text-sm text-muted-foreground'>
          {task.dueDate}
        </TableCell>
        <TableCell className='h-16 px-4 max-w-[300px] text-sm text-muted-foreground'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='block cursor-help truncate'>{task.notes}</span>
              </TooltipTrigger>
              <TooltipContent className='max-w-md'>{task.notes}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className='h-16 px-4 justify-end flex'>
          <TooltipProvider>
            <div className='flex items-center gap-1'>
              {task.status === 'checked-in' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => handleAction(task, 'checkout')}
                      disabled={busy}
                    >
                      {checkoutPending ? (
                        <Loader2 className='size-4 animate-spin' />
                      ) : (
                        <PlayIcon className='size-4' />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Check Out</TooltipContent>
                </Tooltip>
              )}
              {task.status === 'checked-out' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => handleAction(task, 'checkin')}
                      disabled={busy}
                    >
                      {checkinPending ? (
                        <Loader2 className='size-4 animate-spin' />
                      ) : (
                        <CheckCircle className='size-4' />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Check In</TooltipContent>
                </Tooltip>
              )}

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8'
                    disabled={busy || editPending}
                    onClick={() => {
                      setPendingAction({ id: task.id, type: 'edit' });
                      setTimeout(() => setPendingAction(null), 200);
                    }}
                  >
                    <Edit className='size-4' />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Book</SheetTitle>
                    <SheetDescription>
                      Edit "{task.title}" details below.
                    </SheetDescription>
                  </SheetHeader>
                  <div className='grid flex-1 auto-rows-min gap-6 px-4 py-2'>
                    <div className='grid gap-3'>
                      <Label>Title</Label>
                      <Input defaultValue={task.title} />
                    </div>
                    <div className='grid gap-3'>
                      <Label>Assignee / Borrower</Label>
                      <Input defaultValue={task.assignee} />
                    </div>
                    <div className='grid gap-3'>
                      <Label>Book Type</Label>
                      <Select>
                        <SelectTrigger className='w-full'>
                          <SelectValue
                            placeholder='Select a type'
                            defaultValue={task.bookType}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Book type</SelectLabel>
                            <SelectItem value='other'>Other</SelectItem>
                            <SelectItem value='fiction'>Fiction</SelectItem>
                            <SelectItem value='non-fiction'>
                              Non-fiction
                            </SelectItem>
                            <SelectItem value='science-fiction'>
                              Science Fiction
                            </SelectItem>
                            <SelectItem value='biography'>Biography</SelectItem>
                            <SelectItem value='fantasy'>Fantasy</SelectItem>
                            <SelectItem value='mystery'>Mystery</SelectItem>
                            <SelectItem value='thriller'>Thriller</SelectItem>
                            <SelectItem value='romance'>Romance</SelectItem>
                            <SelectItem value='historical'>
                              Historical
                            </SelectItem>
                            <SelectItem value='poetry'>Poetry</SelectItem>
                            <SelectItem value='self-help'>Self-help</SelectItem>
                            <SelectItem value='young-adult'>
                              Young Adult
                            </SelectItem>
                            <SelectItem value='children'>Children's</SelectItem>
                            <SelectItem value='graphic-novel'>
                              Graphic Novel
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='grid gap-3'>
                      <Label>Due Date</Label>
                      <Input defaultValue={task.dueDate} />
                    </div>
                    <div className='grid gap-3'>
                      <Label>Notes</Label>
                      <Input defaultValue={task.notes} />
                    </div>
                    <div className='grid gap-3'>
                      <Label>Status</Label>
                      <Select>
                        <SelectTrigger className='w-full'>
                          <SelectValue
                            placeholder={
                              task.status === 'checked-in'
                                ? 'Checked In'
                                : 'Checked Out'
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value='checked-in'>
                              Checked In
                            </SelectItem>
                            <SelectItem value='checked-out'>
                              Checked Out
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button
                      type='submit'
                      onClick={() => console.log('Save book (mock)')}
                    >
                      Save
                    </Button>
                    <SheetClose asChild>
                      <Button variant='outline'>Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8 text-destructive hover:bg-destructive hover:text-white'
                    disabled={busy}
                  >
                    {deletePending ? (
                      <Loader2 className='size-4 animate-spin' />
                    ) : (
                      <Trash2Icon className='size-4' />
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete book?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{task.title}"? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleAction(task, 'delete')}
                      className='bg-destructive text-white'
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TooltipProvider>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className='rounded-lg border bg-card'>
      <Table className='max-w-[calc(100vw-'>
        <TableHeader>
          <TableRow className='hover:bg-transparent border-b'>
            <TableHead className='h-12 px-4 font-medium'>Title</TableHead>
            <TableHead className='h-12 px-4 font-medium'>Assignee</TableHead>
            <TableHead className='h-12 px-4 font-medium'>Book Type</TableHead>
            <TableHead className='h-12 px-4 font-medium w-[120px]'>
              Status
            </TableHead>

            <TableHead className='h-12 px-4 font-medium'>Due Date</TableHead>
            <TableHead className='h-12 px-4 font-medium'>Notes</TableHead>
            <TableHead className='h-12 px-4 font-medium text-end w-[180px]'>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{tasks.map(renderTaskRow)}</TableBody>
      </Table>
    </div>
  );
}
