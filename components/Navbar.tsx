import { Link, Row, Text } from '@geist-ui/react';
import { useUser } from '@auth0/nextjs-auth0';
import NextLink from 'next/link';

export default function Navbar() {
  const { user, error, isLoading } = useUser();

  console.log(user);
  console.log(error);
  console.log(isLoading);

  return (
    <Row className='border-b border-gray-200 !fixed !bg-gray-50 z-10'>
      <div className='text-gray-700 flex justify-around items-center !min-w-[100vw]'>
        <div className='flex items-center justify-between'>
          <img src='/logo.svg' alt='GetLost' width='25px' />
          <Text b p className='ml-2 text-2xl'>
            Get
            <span className='px-1 bg-gray-900 rounded-md text-gray-50'>
              Lost
            </span>
          </Text>
        </div>
        {user ? (
          <div className='flex items-center justify-between gap-x-3'>
            <NextLink href='/api/auth/logout'>
              <Link block href='/api/auth/logout'>
                Sign out
              </Link>
            </NextLink>
            <div>
              <img
                src={user.picture}
                alt={user.nickname}
                className='w-10 rounded-full'
              />
            </div>
          </div>
        ) : (
          <div>
            <div className='inline-block'>
              <NextLink href='/api/auth/login'>
                <Link block href='/api/auth/login'>
                  Sign Up
                </Link>
              </NextLink>
            </div>
            <div className='inline-block'>
              <NextLink href='/api/auth/login'>
                <Link block href='/api/auth/login'>
                  Sign In
                </Link>
              </NextLink>
            </div>
          </div>
        )}
      </div>
    </Row>
  );
}
