import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface LoaderProps {
  onView: () => void;
  enabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function Loader({
  onView,
  enabled = true,
  style,
  className,
}: LoaderProps) {
  const loaderRef = useInfiniteScroll(onView, enabled);

  return <div ref={loaderRef} style={style} className={className} />;
}
