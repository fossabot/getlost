import { Avatar, Badge, Link, Popover, Text, Tooltip } from '@geist-ui/react';
import { DashboardNavbarProps } from '../../lib/interfaces';

export default function DashboardNavbar(props: DashboardNavbarProps) {
  const { user } = props;

  const avatarPopoverContent = () => {
    return (
      <div className='!min-w-[200px]'>
        <Popover.Item>
          <Tooltip
            text={user?.email}
            type='success'
            className='!-my-5'
            placement='left'>
            <p className='!block font-bold'>{user?.name}</p>
          </Tooltip>
        </Popover.Item>
        <Popover.Item line />
        <Popover.Item>
          <Link block href='/logout' className='font-bold'>
            Logout
          </Link>
        </Popover.Item>
        <Popover.Item line />
        <Popover.Item>
          <Link block href='#' className='font-bold'>
            Support
          </Link>
        </Popover.Item>
        <Popover.Item line />

        <Popover.Item>
          <Link block href='#' className='font-bold'>
            Docs
          </Link>
        </Popover.Item>
      </div>
    );
  };

  return (
    <div className='flex items-center justify-between px-16 mb-12 border-b border-gray-200 bg-gray-50'>
      <div className='flex items-center justify-between'>
        <img src='/getlost.png' alt='GetLost' width='25px' />
        <Text b p className='ml-2 text-2xl'>
          Get
          <span className='px-1 bg-gray-900 rounded-md text-gray-50'>Lost</span>
        </Text>
        <Badge type='success' size='small' className='ml-2'>
          <strong>DASHBOARD</strong>
        </Badge>
      </div>
      <div>
        <Popover content={avatarPopoverContent} placement='leftStart'>
          <Avatar src={user?.picture} size='small' className='cursor-pointer' />
        </Popover>
      </div>
    </div>
  );
}
