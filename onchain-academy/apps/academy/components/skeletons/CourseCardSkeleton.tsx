// Skeleton shimmer that matches CourseCard layout

const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent'

const CourseCardSkeleton = () => (
  <div className='rounded-2xl border border-border-warm bg-card overflow-hidden flex flex-col'>
    {/* Thumbnail */}
    <div className={`h-[140px] w-full bg-charcoal/8 ${shimmer}`} />

    <div className='p-5 flex flex-col gap-3 flex-1'>
      {/* Tags row */}
      <div className='flex items-center gap-2'>
        <div className={`h-5 w-16 rounded-full bg-charcoal/8 ${shimmer}`} />
        <div className={`h-5 w-12 rounded-full bg-charcoal/8 ${shimmer}`} />
      </div>

      {/* Title */}
      <div className='flex flex-col gap-1.5'>
        <div className={`h-4 w-full rounded-md bg-charcoal/8 ${shimmer}`} />
        <div className={`h-4 w-3/4 rounded-md bg-charcoal/8 ${shimmer}`} />
      </div>

      {/* Description */}
      <div className='flex flex-col gap-1'>
        <div className={`h-3 w-full rounded-md bg-charcoal/6 ${shimmer}`} />
        <div className={`h-3 w-5/6 rounded-md bg-charcoal/6 ${shimmer}`} />
        <div className={`h-3 w-2/3 rounded-md bg-charcoal/6 ${shimmer}`} />
      </div>

      {/* Meta row */}
      <div className='flex items-center gap-3 mt-auto pt-2 border-t border-border-warm'>
        <div className={`h-3 w-14 rounded-md bg-charcoal/6 ${shimmer}`} />
        <div className={`h-3 w-14 rounded-md bg-charcoal/6 ${shimmer}`} />
        <div className={`h-3 w-12 rounded-md bg-charcoal/6 ${shimmer}`} />
      </div>
    </div>
  </div>
)

export default CourseCardSkeleton
