import landscapeCategoryCover from '@/assets/images/landscape.jpg';
import portraitsCategoryCover from '@/assets/images/portraits.jpg';
import adirondacksCover from '@/assets/optimized/adks.webp';
import adirondacks2026Cover from '@/assets/optimized/adks2026.webp';
import alaska2018Cover from '@/assets/optimized/alaska2018.webp';
import alaska2020Cover from '@/assets/optimized/alaska2020.webp';
import animalsCover from '@/assets/optimized/animals.webp';
import beachCover from '@/assets/optimized/beach.webp';
import landscapeCardCover from '@/assets/optimized/landscape.webp';
import malabarCover from '@/assets/optimized/malabar.webp';
import mammothCover from '@/assets/optimized/mammoth.webp';
import miscCover from '@/assets/optimized/misc.webp';
import portraitsCardCover from '@/assets/optimized/portraits.webp';
import rio1Cover from '@/assets/optimized/rio1.webp';
import rio2Cover from '@/assets/optimized/rio2.webp';
import rio3Cover from '@/assets/optimized/rio3.webp';
import roadtripCover from '@/assets/optimized/roadtrip.webp';
import rockiesCover from '@/assets/optimized/rockies2024.webp';
import snowCover from '@/assets/optimized/snow.webp';
import summerCover from '@/assets/optimized/summer.webp';
import ted1Cover from '@/assets/optimized/ted1.webp';
import ted2Cover from '@/assets/optimized/ted2.webp';
import tetonsCover from '@/assets/optimized/tetons.webp';
import yellowstoneCover from '@/assets/optimized/yellowstone.webp';
import yosemiteCover from '@/assets/optimized/yosemite.webp';
import type { GalleryAlbum, GalleryCategory } from '@/types';

const album = (input: GalleryAlbum): GalleryAlbum => input;

export const galleryCategories: GalleryCategory[] = [
  {
    albums: [
      album({
        cover: adirondacks2026Cover,
        description:
          'An array of stunning views of the Great Range from the view of the hike up Big Slide peak.',
        id: 'adirondacks2026',
        location: 'Adirondack Park, New York',
        title: 'Adirondacks',
        year: '2026',
      }),
      album({
        cover: adirondacksCover,
        description:
          'High peaks, still water, and low cloud across the Adirondacks — a week of early starts and long light in northern New York.',
        id: 'adirondacks2025',
        location: 'Adirondack Park, New York',
        title: 'Adirondacks',
        year: '2025',
      }),
      album({
        cover: rockiesCover,
        description:
          'Alpine ridgelines, glacial basins, and fast-moving mountain weather photographed across the Rocky Mountains.',
        id: 'rockies2024',
        location: 'Rocky Mountains, Colorado',
        title: 'Rockies',
        year: '2024',
      }),
      album({
        cover: yellowstoneCover,
        description:
          'Geyser basins, hot springs, and open river valleys — the strange geology and wide horizons of Yellowstone.',
        id: 'yellowstone2021',
        location: 'Yellowstone National Park, Wyoming',
        title: 'Yellowstone',
        year: '2021',
      }),
      album({
        cover: tetonsCover,
        description:
          'The Teton range at close range: abrupt granite, glacial lakes, and the light that makes the whole wall legible.',
        id: 'tetons2021',
        location: 'Grand Teton National Park, Wyoming',
        title: 'Grand Tetons',
        year: '2021',
      }),
      album({
        cover: alaska2020Cover,
        description:
          'A second trip north — glaciers, coastline, and the particular scale that only Alaska makes obvious.',
        id: 'alaska2020',
        location: 'Alaska',
        title: 'Alaska',
        year: '2020',
      }),
      album({
        cover: mammothCover,
        description:
          'Eastern Sierra granite, high desert, and alpine lakes photographed around Mammoth over a long weekend.',
        id: 'mammoth2020',
        location: 'Mammoth Lakes, California',
        title: 'Mammoth',
        year: '2020',
      }),
      album({
        cover: yosemiteCover,
        description:
          'Valley walls, waterfalls, and the granite that made Yosemite the reference point for landscape photography.',
        id: 'yosemite2019',
        location: 'Yosemite National Park, California',
        title: 'Yosemite',
        year: '2019',
      }),
      album({
        cover: malabarCover,
        description:
          'A short, quiet set — open country, soft light, and the kind of frames that come from slowing down.',
        id: 'malabar2019',
        title: 'Malabar',
        year: '2019',
      }),
      album({
        cover: roadtripCover,
        description:
          'The largest set here: highways, small towns, national parks, and everything between them across a cross-country drive.',
        id: 'roadtrip2018',
        title: 'American Roadtrip',
        year: '2018',
      }),
      album({
        cover: alaska2018Cover,
        description:
          'A first trip to Alaska — ice, water, and coastline, shot with more curiosity than plan.',
        id: 'alaska2018',
        location: 'Alaska',
        title: 'Alaska',
        year: '2018',
      }),
      album({
        cover: summerCover,
        description:
          'Warm evenings, long grass, and water — an unstructured summer set from the early days of shooting.',
        id: 'summer2017',
        title: 'Summer',
        year: '2017',
      }),
    ],
    cardCover: landscapeCardCover,
    cover: landscapeCategoryCover,
    description: 'Roads, mountains, weather, and the quiet scale of the American landscape.',
    id: 'landscape',
    title: 'Landscape',
  },
  {
    albums: [
      album({
        cover: ted1Cover,
        description:
          'A first-birthday session shot in natural light — expressions caught between poses rather than posed for.',
        id: 'teddy12m',
        title: 'Teddy — One Year',
        year: '2017',
      }),
      album({
        cover: ted2Cover,
        description:
          'Six months on and moving constantly. An outdoor session built around keeping up rather than sitting still.',
        id: 'teddy18m',
        title: 'Teddy — 18 Months',
        year: '2018',
      }),
      album({
        cover: beachCover,
        description:
          'A maternity session on the coast — open sand, late light, and the quiet between frames.',
        id: 'trudybeachmaternity',
        title: 'Trudy — Beach',
        year: '2019',
      }),
      album({
        cover: snowCover,
        description:
          'The winter counterpart to the beach session: bare trees, deep snow, and flat northern light.',
        id: 'trudysnowmaternity',
        title: 'Trudy — Snow',
        year: '2019',
      }),
      album({
        cover: rio1Cover,
        description:
          'Three months old. The longest set in this collection — small gestures, close in, mostly window light.',
        id: 'rio3m',
        title: 'Rio — Three Months',
        year: '2019',
      }),
      album({
        cover: rio2Cover,
        description:
          'Eight months and sitting up. A short session, shot quickly while the mood held.',
        id: 'rio8m',
        title: 'Rio — Eight Months',
        year: '2019',
      }),
      album({
        cover: rio3Cover,
        description:
          'Fifteen months, walking, and entirely uninterested in the camera — which is usually when the good frames arrive.',
        id: 'rio15m',
        title: 'Rio — 15 Months',
        year: '2020',
      }),
    ],
    cardCover: portraitsCardCover,
    cover: portraitsCategoryCover,
    description: 'Families, milestones, and candid moments shaped by natural light.',
    id: 'portraits',
    title: 'Portraits',
  },
  {
    albums: [
      album({
        cover: animalsCover,
        description:
          'Wildlife and domestic characters met on the road and close to home — patient waiting, occasionally rewarded.',
        id: 'animals',
        title: 'Animals',
      }),
    ],
    cardCover: animalsCover,
    cover: animalsCover,
    description: 'Wildlife and domestic characters encountered close to home and far away.',
    directAlbum: 'animals',
    id: 'animals',
    title: 'Animals',
  },
  {
    albums: [
      album({
        cover: miscCover,
        description:
          'Frames that never belonged to a trip or a session — small observations kept because they held up.',
        id: 'misc',
        title: 'Miscellaneous',
      }),
    ],
    cardCover: miscCover,
    cover: miscCover,
    description: 'Small visual observations that do not need a category to earn their place.',
    directAlbum: 'misc',
    id: 'misc',
    title: 'Miscellaneous',
  },
];

export const getGalleryCategory = (categoryId?: string) =>
  galleryCategories.find((category) => category.id === categoryId);

export const getGalleryAlbum = (categoryId?: string, albumId?: string) =>
  getGalleryCategory(categoryId)?.albums.find((entry) => entry.id === albumId);
