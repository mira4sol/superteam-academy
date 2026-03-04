// Skeleton for the /courses/[slug] course detail page

const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent'

const CourseSlugSkeleton = () => (
  <>
    {/* ── HERO skeleton ─── */}
    <div className='bg-green-secondary'>
      <div className='max-w-[1200px] mx-auto px-[5%] py-10 lg:py-14'>
        <div className='flex flex-col lg:flex-row gap-8 lg:items-start'>
          {/* Left */}
          <div className='flex-1 flex flex-col gap-4'>
            {/* Breadcrumb */}
            <div className='flex gap-2'>
              <div className={`h-3 w-16 rounded-md bg-cream/15 ${shimmer}`} />
              <div className={`h-3 w-4 rounded-md bg-cream/10 ${shimmer}`} />
              <div className={`h-3 w-32 rounded-md bg-cream/15 ${shimmer}`} />
            </div>

            {/* Difficulty + Topic */}
            <div className='flex gap-2'>
              <div className={`h-5 w-20 rounded-full bg-cream/12 ${shimmer}`} />
              <div className={`h-5 w-16 rounded-full bg-cream/12 ${shimmer}`} />
            </div>

            {/* Title */}
            <div className='flex flex-col gap-2'>
              <div className={`h-8 w-full rounded-lg bg-cream/15 ${shimmer}`} />
              <div className={`h-8 w-2/3 rounded-lg bg-cream/15 ${shimmer}`} />
            </div>

            {/* Description */}
            <div className='flex flex-col gap-1.5'>
              <div
                className={`h-3.5 w-full rounded-md bg-cream/10 ${shimmer}`}
              />
              <div
                className={`h-3.5 w-5/6 rounded-md bg-cream/10 ${shimmer}`}
              />
              <div
                className={`h-3.5 w-3/4 rounded-md bg-cream/10 ${shimmer}`}
              />
            </div>

            {/* Meta pills */}
            <div className='flex gap-3'>
              {[64, 80, 72, 60].map((w) => (
                <div
                  key={w}
                  className={`h-3 rounded-md bg-cream/8 ${shimmer}`}
                  style={{ width: w }}
                />
              ))}
            </div>
          </div>

          {/* Right — enroll card */}
          <div className='lg:w-[320px] flex-shrink-0'>
            <div className='rounded-2xl p-6 border border-cream/12 bg-cream/5 flex flex-col gap-4'>
              <div
                className={`h-8 w-16 mx-auto rounded-lg bg-cream/12 ${shimmer}`}
              />
              <div
                className={`h-12 w-full rounded-xl bg-cream/12 ${shimmer}`}
              />
              <div
                className={`h-3 w-32 mx-auto rounded-md bg-cream/8 ${shimmer}`}
              />
              <div className='border-t border-cream/10 pt-3 flex gap-3'>
                <div className={`h-3 w-20 rounded-md bg-cream/8 ${shimmer}`} />
                <div className={`h-3 w-24 rounded-md bg-cream/8 ${shimmer}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ── CONTENT skeleton ─── */}
    <div className='max-w-[1200px] mx-auto px-[5%] py-12'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left 2/3 */}
        <div className='lg:col-span-2 flex flex-col gap-6'>
          {/* What you'll learn */}
          <div className='card-warm rounded-2xl p-6 flex flex-col gap-3'>
            <div className={`h-5 w-36 rounded-md bg-charcoal/8 ${shimmer}`} />
            <div className='grid grid-cols-2 gap-2.5'>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`h-10 rounded-lg bg-charcoal/5 ${shimmer}`}
                />
              ))}
            </div>
          </div>

          {/* Module accordion */}
          <div className='card-warm rounded-2xl p-6 flex flex-col gap-3'>
            <div className={`h-5 w-40 rounded-md bg-charcoal/8 ${shimmer}`} />
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`h-14 rounded-xl bg-charcoal/5 ${shimmer}`}
              />
            ))}
          </div>
        </div>

        {/* Right 1/3 */}
        <div className='flex flex-col gap-5'>
          <div className='card-warm rounded-2xl p-6 flex flex-col gap-3'>
            <div className={`h-5 w-28 rounded-md bg-charcoal/8 ${shimmer}`} />
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`h-8 rounded-lg bg-charcoal/5 ${shimmer}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
)

export default CourseSlugSkeleton
