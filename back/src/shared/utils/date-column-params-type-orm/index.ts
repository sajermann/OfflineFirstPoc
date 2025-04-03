export const config = {
  type: 'bigint',
  nullable: false,
  transformer: {
    to(value: Date | string | null): number {
      if (value instanceof Date) {
        return value.getTime();
      }
      if (typeof value === 'string') {
        return new Date(value).getTime();
      }
      return typeof value === 'number' ? value : null;
    },
    from(value: string | null): Date {
      if (typeof value === 'string') {
        return new Date(Number(value));
      }

      if (typeof value === 'number') {
        return new Date(value);
      }
      return null;
    },
  },
} as any;
