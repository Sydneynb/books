import TableView from '@/components/table-view';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Books() {
  return (
    <div className='w-full h-full'>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='font-mono text-2xl font-medium'>Books</h1>
        <AddNew>
          <Button size={'sm'}>
            <Plus /> Add New
          </Button>
        </AddNew>
      </div>
      <TableView></TableView>;
    </div>
  );
}

function AddNew({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Book</SheetTitle>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='grid gap-3'>
            <Label>Title</Label>
            <Input />
          </div>

          <div className='grid gap-3'>
            <Label>Assignee</Label>
            <Input />
          </div>

          <div className='grid gap-3'>
            <Label>Book Category</Label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Book type</SelectLabel>
                  <SelectItem value='other'>Other</SelectItem>
                  <SelectItem value='fiction'>Fiction</SelectItem>
                  <SelectItem value='non-fiction'>Non-fiction</SelectItem>
                  <SelectItem value='science-fiction'>
                    Science Fiction
                  </SelectItem>
                  <SelectItem value='biography'>Biography</SelectItem>
                  <SelectItem value='fantasy'>Fantasy</SelectItem>
                  <SelectItem value='mystery'>Mystery</SelectItem>
                  <SelectItem value='thriller'>Thriller</SelectItem>
                  <SelectItem value='romance'>Romance</SelectItem>
                  <SelectItem value='historical'>Historical</SelectItem>
                  <SelectItem value='poetry'>Poetry</SelectItem>
                  <SelectItem value='self-help'>Self-help</SelectItem>
                  <SelectItem value='young-adult'>Young Adult</SelectItem>
                  <SelectItem value='children'>Children's</SelectItem>
                  <SelectItem value='graphic-novel'>Graphic Novel</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='grid gap-3'>
            <Label>Description</Label>
            <Input />
          </div>
        </div>

        <SheetFooter>
          <Button type='submit'>Save changes</Button>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
