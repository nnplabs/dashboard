export type Indexes = {
  readonly start: number;
  readonly end: number;
};

export default function sliceString(
  address?: string,
  indexes?: Indexes
): string {
  if (!address) return "";
  if (address.length < 20) return address;

  if (indexes)
    return `${address.slice(0, indexes.start)}...${address.slice(
      address.length - indexes.end
    )}`;
  return `${address.slice(0, 8)}...${address.slice(address.length - 8)}`;
}

export function customSlice54(value?: string) {
  return sliceString(value ?? "", { start: 5, end: 4 });
}
