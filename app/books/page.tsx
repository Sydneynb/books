import TableView from '@/components/table-view';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Books() {
  return (
    <div className='w-full h-full'>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='font-mono text-2xl font-medium'>Books</h1>
        <Button size={'sm'}>
          <Plus /> Add New
        </Button>
      </div>
      <TableView></TableView>;
    </div>
  );
}
