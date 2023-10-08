const loading = () => {
  return (
    <div className='flex-1 flex items-center justify-center'>
      <svg
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-live='polite'
        aria-busy='true'
        aria-labelledby='title-08a desc-08a'
        className='w-16 h-16'
      >
        <title id='title-08a'>Icon title</title>
        <desc id='desc-08a'>Some desc</desc>
        <path d='M7 8H3V16H7V8Z' className='fill-[var(--brand-accent)] animate animate-bounce ' />
        <path
          d='M14 8H10V16H14V8Z'
          className='fill-[var(--brand-accent)] animate animate-bounce  [animation-delay:.2s]'
        />
        <path
          d='M21 8H17V16H21V8Z'
          className='fill-[var(--brand-accent)] animate animate-bounce  [animation-delay:.4s]'
        />
      </svg>
    </div>
  );
};

export default loading;
