'use client';

import { LeavingDialog } from '@/app/frontend_components/LeavingDialog';
import { redirect, useRouter } from 'next/navigation';
import { memo, useEffect, useRef, useState } from 'react';

type PreventNavigationProps = {
  isDirty: boolean;
  backHref: string;
  resetData: () => void;
};

export const PreventNavigation = ({ isDirty, backHref, resetData }: PreventNavigationProps) => {
  const [leavingPage, setLeavingPage] = useState(false);
  const router = useRouter();

  /**
   * Function that will be called when the user selects `yes` in the confirmation modal,
   * redirected to the selected page.
   */
  const confirmationFn = useRef<() => void>(() => {});

  // Used to make popstate event trigger when back button is clicked.
  // Without this, the popstate event will not fire because it needs there to be a href to return.
  if (typeof window !== 'undefined') {
    window.history.pushState(null, document.title, window.location.href);
  }

  useEffect(() => {
    /**
     * Used to prevent navigation when use click in navigation `<Link />` or `<a />`.
     * @param e The triggered event.
     */
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;

      if (isDirty) {
        console.log("Initiating route change while having dirty forms...")
        event.preventDefault();

        confirmationFn.current = () => {
          console.log(`target route: ${target.href}`)
          // router.push("/pages/random-page1");  //THIS DOES NOT WORK FOR A MYSTERIOUS REASON
          console.log("Confirmation Function cleared after confirmation action!!!")
          // redirect(target.href)
          router.push(target.href)
          // resetData()   // This is also concerning, if this persist in other cases also, its terrible
        };
        console.log("Confirmation function set!")
        console.log(confirmationFn.current)

        setLeavingPage(true);
      }
    };
    /* ********************************************************************* */

    /**
     * Used to prevent navigation when use `back` browser buttons.
     */
    const handlePopState = () => {
      if (isDirty) {
        window.history.pushState(null, document.title, window.location.href);

        confirmationFn.current = () => {
          router.push(backHref);
        };

        setLeavingPage(true);
      } else {
        window.history.back();
      }
    };
    /* ********************************************************************* */

    /**
     * Used to prevent navigation when reload page or navigate to another page, in diffenret origin.
     * @param e The triggered event.
     */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = true;
      }
    };
    /* ********************************************************************* */

    /* *************************** Open listeners ************************** */
    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', handleClick);
    });
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    /* ************** Return from useEffect closing listeners ************** */
    return () => {
      document.querySelectorAll('a').forEach((link) => {
        link.removeEventListener('click', handleClick);
      });
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  return (
    <>
      <LeavingDialog
        isOpen={leavingPage}
        noCallback={() => {
          setLeavingPage(false);
          confirmationFn.current = () => {};
          console.log("Confirmation Function cleared after cancellation action!!")
        }}
        yesCallback={() => {
          // confirmationFn.current = () => {};
          console.log("Confirmation Function cleared after confirmation action!!")
          // setLeavingPage(false);  //This line should not be here, it always breaks stuff
          confirmationFn.current();  //AFTER redirect() nothing runs
        }}
      />
    </>
  );
};