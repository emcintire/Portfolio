import type { Photograph } from '../../types';
import { animals } from './animalsPhotos';
import {
  adirondacks2025, alaska2018, alaska2020, malabar2019, mammoth2020, roadtrip2018, rockies2024, summer2017,
  tetons2021, yellowstone2021, yosemite2019,
} from './landscapePhotos';
import { misc } from './miscPhotos';
import { rio3m, rio8m, rio15m, teddy12m, teddy18m, trudybeachmaternity, trudysnowmaternity } from './portraitPhotos';

export const photographs: Record<string, Array<Photograph>> = {
  adirondacks2025,
  alaska2018,
  alaska2020,
  animals,
  malabar2019,
  mammoth2020,
  misc,
  rio15m,
  rio3m,
  rio8m,
  roadtrip2018,
  rockies2024,
  summer2017,
  teddy12m,
  teddy18m,
  tetons2021,
  trudybeachmaternity,
  trudysnowmaternity,
  yellowstone2021,
  yosemite2019,
};
