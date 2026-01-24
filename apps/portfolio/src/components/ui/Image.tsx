import NextImage, { ImageProps as NextImageProps } from 'next/image';

type ImageProps = Omit<NextImageProps, 'src'> & {
  readonly src: string;
};

export function Image({ src, alt, className, ...props }: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      className={className}
      unoptimized
      {...props}
    />
  );
}
