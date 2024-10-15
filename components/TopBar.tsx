import Logo from '@/assets/logo.png';
import { auth } from '@/utils/auth';

import Image from 'next/image';
import SignInButton from './RedirectSignInButton';
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import SignOutButton from './SignOutButton';
import AutoCompleteSearchBook from './AutoCompleteSearchBook';
const TopBar = async () => {
  const session = await auth()
  
  return (
    <div className='flex justify-between items-center w-full px-4 bg-white'>
      <Image src={Logo.src} alt='Logo' quality={100} width={100} height={100} className='h-14 w-14' />
      <AutoCompleteSearchBook />
      
      {
        session ? (
          <Popover placement="bottom">
          <PopoverTrigger>
            {/* <Button>Open Popover</Button> */}
          <div className='h-10 w-10 cursor-pointer rounded-full'>
            <Image src={'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1'} alt='Avatar' quality={100} width={100} height={100} className='h-10 w-10 rounded-full' />
          </div>

          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 items-center justify-center px-1 py-2">
              <div className="text-small font-bold">{session!.user?.name}</div>
              <SignOutButton />
            </div>
          </PopoverContent>
        </Popover>
        )
        :
        (
<SignInButton />
        )
      }
    </div>
  );
};

export default TopBar;