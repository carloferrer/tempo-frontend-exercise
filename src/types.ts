export type TSticky = {
  id: number;
  note: string;
  size: number;
  onTheMove: boolean;
  position: {
    x: number;
    y: number;
  };
};
