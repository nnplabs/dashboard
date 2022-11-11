import React, { forwardRef } from 'react';
import classnames from 'classnames';

export type TextInputProps = React.ComponentPropsWithoutRef<'input'> & {
  readonly isTextCentered?: boolean;
  readonly isErrorHighlighted?: boolean;
  readonly textMsg?: string;
  readonly className?: string;
};

const Input = forwardRef<HTMLInputElement, TextInputProps>(
  ({ isTextCentered, isErrorHighlighted, textMsg, className, ...rest }, ref) => {
    return (
      <>
        <input
          className={classnames(
            {
              'bg-white-100 text-black-100 text-base w-full h-12 rounded-lg py-3 px-4 border-solid border-[1px] dark:text-white-100 dark:bg-gray-900 focus:outline-none':
                true,
              'text-center': isTextCentered,
              'border-red-500': isErrorHighlighted,
              'border-gray-300 focus:border-blue-500': !isErrorHighlighted,
            },
            className,
          )}
          {...rest}
          ref={ref}
        />
        {textMsg && (
          <div
            className={classnames({
              'text-xs text-black-100 dark:text-white-100': true,
              'text-red-500': isErrorHighlighted,
            })}
          >
            {textMsg}
          </div>
        )}
      </>
    );
  },
);
Input.displayName = 'Input';

export default Input;
