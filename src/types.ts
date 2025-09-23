export type TSticky = {
  id: number;
  note: string;
  size: 'small' | 'large';
  onTheMove: boolean;
  position: {
    x: number;
    y: number;
  };
};
