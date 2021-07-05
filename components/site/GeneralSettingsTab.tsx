import { Card, Text, Input, Button, Textarea } from '@geist-ui/react';
import checkIsGoodPassword from '@/lib/validatePassword';
import {
  GeneralSiteSettingsFormValues,
  HarperDBRecord,
} from '@/lib/interfaces';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import validateAndUpdateSiteData from '@/lib/validateAndUpdateSiteData';
import useSites from '@/lib/useSites';

export default function GeneralSettingsTab({ data }) {
  const siteData: HarperDBRecord = data;

  const showErrorMessage = (message: string) => {
    return (
      <p className='px-3 py-1 text-base text-red-500 border border-red-600 rounded max-w-[384px]'>
        {message}
      </p>
    );
  };
  const [editedInput, setEditedInput] = useState<
    'site_name' | 'site_desc' | 'expiration_days' | 'password' | null
  >(null);
  const { mutate } = useSites();

  const [site_desc, setSite_desc] = useState(siteData?.site_desc);

  const schema = z.object({
    site_name: z.string().nonempty().min(2).max(48),
    password: z.string().nonempty().min(8).max(50),
    site_desc: z.string(),
    expiration_days: z.number().int().min(1).max(365),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GeneralSiteSettingsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      site_name: siteData.site_name,
      site_desc: siteData.site_desc,
      expiration_days: siteData.max_login_duration,
      password: 'A-str0ng-p@55w0rd',
    },
  });

  const handleFormSubmit = async (data) => {
    const res = await validateAndUpdateSiteData(data, editedInput, siteData.id);
    if (res.success) {
      mutate('/api/site/' + siteData.id);
    }
  };

  return (
    <div>
      {/* ------------------------------------------------------------------ */}
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Site name</Text>
        <Text p>
          The name of your password protected website ({siteData?.site_name})
        </Text>
        <Input
          placeholder="Acme's website"
          width='70%'
          clearable
          {...register('site_name')}
        />
        {errors.site_name &&
          showErrorMessage(
            'Site name should be at least 2 characters long and 48 characters at most'
          )}
        <Card.Footer className='!bg-warmgray-50'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>Please use 48 characters at maximum</Text>
            </div>
            <div>
              <Button
                type='secondary'
                auto
                size='small'
                onClick={() => {
                  setEditedInput('site_name');
                  handleSubmit(handleFormSubmit)();
                }}>
                Save
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      {/* ------------------------------------------------------------------ */}
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Site Description</Text>
        <Text p>A short description about your password protected site</Text>
        <Textarea
          width='50%'
          minHeight='100px'
          onChange={(e) => setSite_desc(e.target.value)}
          value={site_desc}
          placeholder='Description...'
          {...register('site_desc')}
        />
        <Card.Footer className='!bg-warmgray-50'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>Please use 250 characters at maximum</Text>
            </div>
            <div>
              <Button
                type='secondary'
                auto
                size='small'
                onClick={() => {
                  setEditedInput('site_desc');
                  handleSubmit(handleFormSubmit)();
                }}>
                Save
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      {/* ------------------------------------------------------------------ */}
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Site URL</Text>
        <Text p>URL of the password protected website</Text>
        <Input
          disabled
          width='70%'
          initialValue={'https://' + siteData.site_url}
        />
        <Card.Footer className='!bg-warmgray-50'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>This field cannot be changed</Text>
            </div>
            <div>
              <Button type='secondary' auto size='small' disabled>
                Save
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      {/* ------------------------------------------------------------------ */}
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Login Expiration</Text>
        <Text p>
          The maximum duration for which a user has access to the website after
          a successful login
        </Text>
        <Input
          className='mt-4'
          type='pass'
          labelRight='days'
          clearable
          {...register('expiration_days', {
            valueAsNumber: true,
          })}
        />
        {errors.expiration_days &&
          showErrorMessage(
            'Value of days should be more than 1 and less than 365'
          )}
        <Card.Footer className='!bg-warmgray-50'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>The default value is 7 days</Text>
            </div>
            <div>
              <Button
                type='secondary'
                auto
                size='small'
                onClick={() => {
                  setEditedInput('expiration_days');
                  handleSubmit(handleFormSubmit)();
                }}>
                Change expiration time
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      {/* ------------------------------------------------------------------ */}
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Change password</Text>
        <Text p>URL of the password protected website</Text>
        <Input
          value='••••••••••'
          disabled
          width='70%'
          label='Current Password'
        />
        <Input.Password
          width='70%'
          className='mt-4'
          autoComplete='on'
          placeholder='••••••••••'
          label='New Password →'
          {...register('password')}
        />
        {errors.password &&
          showErrorMessage(
            'Password should be at least 8 characters long and 50 characters at most'
          )}
        <Card.Footer className='!bg-warmgray-50'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>Edit the above prefilled password to change it</Text>
            </div>
            <div>
              <Button
                type='error'
                auto
                size='small'
                onClick={() => {
                  setEditedInput('password');
                  handleSubmit(handleFormSubmit)();
                }}>
                Change password
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      {/* ------------------------------------------------------------------ */}
    </div>
  );
}
