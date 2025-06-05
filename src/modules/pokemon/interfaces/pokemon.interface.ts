export interface Pokemon {
  id: number;
  name: string;
  chineseName?: string;
  chinese_sub_name?: string;
  japaneseName?: string;
  attribute?: string[];
  chinese_attribute?: string[];
  japanese_attribute?: string[];
  weight?: number;
  height?: number;
  number?: string;
  sub_number?: number;
}
