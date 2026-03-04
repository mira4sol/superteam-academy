// Skeleton for the /courses/[slug]/lesson/[id] lesson page

const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/8 before:to-transparent'

const LessonSkeleton = () => (
  <div className='flex h-screen overflow-hidden'>
    {/* ── Sidebar skeleton ─── */}
    <div
      className='hidden lg:flex flex-col w-[300px] flex-shrink-0 border-r overflow-y-auto'
      style={{
        background: 'hsl(var(--sidebar-bg, 137 41% 7%))',
        borderColor: 'rgba(82,221,160,0.1)',
      }}
    >
      {/* Course title */}
      <div
        className='p-4 border-b'
        style={{ borderColor: 'rgba(82,221,160,0.1)' }}
      >
        <div className={`h-4 w-full rounded-md bg-cream/10 ${shimmer}`} />
        <div className={`h-3 w-3/4 rounded-md bg-cream/8 mt-2 ${shimmer}`} />
      </div>

      {/* Module list */}
      <div className='flex-1 p-3 flex flex-col gap-2'>
        {[...Array(3)].map((_, mi) => (
          <div key={mi} className='flex flex-col gap-1'>
            <div className={`h-9 w-full rounded-lg bg-cream/8 ${shimmer}`} />
            {[...Array(3)].map((_, li) => (
              <div
                key={li}
                className={`h-8 w-full rounded-lg bg-cream/5 ml-2 ${shimmer}`}
                style={{ width: 'calc(100% - 8px)' }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>

    {/* ── Content skeleton ─── */}
    <div className='flex-1 flex flex-col overflow-hidden'>
      {/* Top bar */}
      <div
        className='flex items-center justify-between px-6 py-3 border-b flex-shrink-0'
        style={{
          background: 'hsl(137 41% 7%)',
          borderColor: 'rgba(82,221,160,0.1)',
        }}
      >
        <div className='flex items-center gap-3'>
          <div className={`h-7 w-7 rounded-lg bg-cream/10 ${shimmer}`} />
          <div className={`h-4 w-32 rounded-md bg-cream/10 ${shimmer}`} />
        </div>
        <div className='flex gap-2'>
          <div className={`h-8 w-24 rounded-lg bg-cream/8 ${shimmer}`} />
          <div
            className={`h-8 w-24 rounded-lg bg-green-primary/20 ${shimmer}`}
          />
        </div>
      </div>

      {/* Lesson content body */}
      <div className='flex-1 overflow-y-auto bg-background p-6 lg:p-10'>
        <div className='max-w-[760px] mx-auto flex flex-col gap-6'>
          {/* Lesson type badge */}
          <div className='flex items-center gap-2'>
            <div className={`h-6 w-20 rounded-full bg-charcoal/8 ${shimmer}`} />
            <div className={`h-5 w-14 rounded-md bg-charcoal/6 ${shimmer}`} />
          </div>

          {/* Lesson title */}
          <div className='flex flex-col gap-2'>
            <div className={`h-8 w-3/4 rounded-lg bg-charcoal/8 ${shimmer}`} />
            <div className={`h-4 w-1/2 rounded-md bg-charcoal/6 ${shimmer}`} />
          </div>

          {/* Content paragraphs */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className='flex flex-col gap-2'>
              <div
                className={`h-4 w-full rounded-md bg-charcoal/6 ${shimmer}`}
              />
              <div
                className={`h-4 w-5/6 rounded-md bg-charcoal/6 ${shimmer}`}
              />
              <div
                className={`h-4 w-4/5 rounded-md bg-charcoal/5 ${shimmer}`}
              />
            </div>
          ))}

          {/* Code block placeholder */}
          <div className={`h-40 w-full rounded-xl bg-charcoal/10 ${shimmer}`} />

          {/* More paragraphs */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className='flex flex-col gap-2'>
              <div
                className={`h-4 w-full rounded-md bg-charcoal/6 ${shimmer}`}
              />
              <div
                className={`h-4 w-3/4 rounded-md bg-charcoal/5 ${shimmer}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default LessonSkeleton
