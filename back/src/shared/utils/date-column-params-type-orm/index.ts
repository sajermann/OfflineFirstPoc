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
      return typeof value === 'string' || 'number' ? new Date(value) : null;
    },
  },
} as any;
