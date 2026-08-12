import landscapeCategoryCover from '@/assets/images/landscape.jpg';
import portraitsCategoryCover from '@/assets/images/portraits.jpg';
import adirondacksCover from '@/assets/optimized/adks.webp';
import adirondacksCoverSmall from '@/assets/optimized/adks-800.webp';
import alaska2018Cover from '@/assets/optimized/alaska2018.webp';
import alaska2018CoverSmall from '@/assets/optimized/alaska2018-800.webp';
import alaska2020Cover from '@/assets/optimized/alaska2020.webp';
import alaska2020CoverSmall from '@/assets/optimized/alaska2020-800.webp';
import animalsCover from '@/assets/optimized/animals.webp';
import animalsCoverSmall from '@/assets/optimized/animals-800.webp';
import beachCover from '@/assets/optimized/beach.webp';
import beachCoverSmall from '@/assets/optimized/beach-800.webp';
import landscapeCardCover from '@/assets/optimized/landscape.webp';
import landscapeCardCoverSmall from '@/assets/optimized/landscape-800.webp';
import malabarCover from '@/assets/optimized/malabar.webp';
import malabarCoverSmall from '@/assets/optimized/malabar-800.webp';
import mammothCover from '@/assets/optimized/mammoth.webp';
import mammothCoverSmall from '@/assets/optimized/mammoth-800.webp';
import miscCover from '@/assets/optimized/misc.webp';
import miscCoverSmall from '@/assets/optimized/misc-800.webp';
import portraitsCardCover from '@/assets/optimized/portraits.webp';
import portraitsCardCoverSmall from '@/assets/optimized/portraits-800.webp';
import rio1Cover from '@/assets/optimized/rio1.webp';
import rio1CoverSmall from '@/assets/optimized/rio1-800.webp';
import rio2Cover from '@/assets/optimized/rio2.webp';
import rio2CoverSmall from '@/assets/optimized/rio2-800.webp';
import rio3Cover from '@/assets/optimized/rio3.webp';
import rio3CoverSmall from '@/assets/optimized/rio3-800.webp';
import roadtripCover from '@/assets/optimized/roadtrip.webp';
import roadtripCoverSmall from '@/assets/optimized/roadtrip-800.webp';
import rockiesCover from '@/assets/optimized/rockies.webp';
import rockiesCoverSmall from '@/assets/optimized/rockies-800.webp';
import snowCover from '@/assets/optimized/snow.webp';
import snowCoverSmall from '@/assets/optimized/snow-800.webp';
import summerCover from '@/assets/optimized/summer.webp';
import summerCoverSmall from '@/assets/optimized/summer-800.webp';
import ted1Cover from '@/assets/optimized/ted1.webp';
import ted1CoverSmall from '@/assets/optimized/ted1-800.webp';
import ted2Cover from '@/assets/optimized/ted2.webp';
import ted2CoverSmall from '@/assets/optimized/ted2-800.webp';
import tetonsCover from '@/assets/optimized/tetons.webp';
import tetonsCoverSmall from '@/assets/optimized/tetons-800.webp';
import yellowstoneCover from '@/assets/optimized/yellowstone.webp';
import yellowstoneCoverSmall from '@/assets/optimized/yellowstone-800.webp';
import yosemiteCover from '@/assets/optimized/yosemite.webp';
import yosemiteCoverSmall from '@/assets/optimized/yosemite-800.webp';
import { photographs } from '@/data/photos';
import type { GalleryAlbum, GalleryCategory } from '@/types';

type AlbumInput = Omit<GalleryAlbum, 'photographs'>;

const album = ({ id, title, ...rest }: AlbumInput): GalleryAlbum => ({
  ...rest,
  id,
  photographs: (photographs[id] ?? [])
    .filter((photograph) => photograph.src.trim())
    .map((photograph, index) => ({
      ...photograph,
      alt: photograph.alt.trim() || `${title} photograph ${index + 1}`,
    })),
  title,
});

export const galleryCategories: GalleryCategory[] = [
  {
    albums: [
      album({
        cover: adirondacksCover,
        coverSmall: adirondacksCoverSmall,
        description:
          'High peaks, still water, and low cloud across the Adirondacks — a week of early starts and long light in northern New York.',
        id: 'adirondacks2025',
        location: 'Adirondack Park, New York',
        title: 'Adirondacks',
        year: '2025',
      }),
      album({
        cover: rockiesCover,
        coverSmall: rockiesCoverSmall,
        description:
          'Alpine ridgelines, glacial basins, and fast-moving mountain weather photographed across the Rocky Mountains.',
        id: 'rockies2024',
        location: 'Rocky Mountains, Colorado',
        title: 'Rockies',
        year: '2024',
      }),
      album({
        cover: yellowstoneCover,
        coverSmall: yellowstoneCoverSmall,
        description:
          'Geyser basins, hot springs, and open river valleys — the strange geology and wide horizons of Yellowstone.',
        id: 'yellowstone2021',
        location: 'Yellowstone National Park, Wyoming',
        title: 'Yellowstone',
        year: '2021',
      }),
      album({
        cover: tetonsCover,
        coverSmall: tetonsCoverSmall,
        description:
          'The Teton range at close range: abrupt granite, glacial lakes, and the light that makes the whole wall legible.',
        id: 'tetons2021',
        location: 'Grand Teton National Park, Wyoming',
        title: 'Grand Tetons',
        year: '2021',
      }),
      album({
        cover: alaska2020Cover,
        coverSmall: alaska2020CoverSmall,
        description:
          'A second trip north — glaciers, coastline, and the particular scale that only Alaska makes obvious.',
        id: 'alaska2020',
        location: 'Alaska',
        title: 'Alaska',
        year: '2020',
      }),
      album({
        cover: mammothCover,
        coverSmall: mammothCoverSmall,
        description:
          'Eastern Sierra granite, high desert, and alpine lakes photographed around Mammoth over a long weekend.',
        id: 'mammoth2020',
        location: 'Mammoth Lakes, California',
        title: 'Mammoth',
        year: '2020',
      }),
      album({
        cover: yosemiteCover,
        coverSmall: yosemiteCoverSmall,
        description:
          'Valley walls, waterfalls, and the granite that made Yosemite the reference point for landscape photography.',
        id: 'yosemite2019',
        location: 'Yosemite National Park, California',
        title: 'Yosemite',
        year: '2019',
      }),
      album({
        cover: malabarCover,
        coverSmall: malabarCoverSmall,
        description:
          'A short, quiet set — open country, soft light, and the kind of frames that come from slowing down.',
        id: 'malabar2019',
        title: 'Malabar',
        year: '2019',
      }),
      album({
        cover: roadtripCover,
        coverSmall: roadtripCoverSmall,
        description:
          'The largest set here: highways, small towns, national parks, and everything between them across a cross-country drive.',
        id: 'roadtrip2018',
        title: 'American Roadtrip',
        year: '2018',
      }),
      album({
        cover: alaska2018Cover,
        coverSmall: alaska2018CoverSmall,
        description:
          'A first trip to Alaska — ice, water, and coastline, shot with more curiosity than plan.',
        id: 'alaska2018',
        location: 'Alaska',
        title: 'Alaska',
        year: '2018',
      }),
      album({
        cover: summerCover,
        coverSmall: summerCoverSmall,
        description:
          'Warm evenings, long grass, and water — an unstructured summer set from the early days of shooting.',
        id: 'summer2017',
        title: 'Summer',
        year: '2017',
      }),
    ],
    cardCover: landscapeCardCover,
    cardCoverHeight: 1066,
    cardCoverSmall: landscapeCardCoverSmall,
    cardCoverSmallHeight: 534,
    cover: landscapeCategoryCover,
    coverHeight: 3266,
    coverWidth: 4898,
    description: 'Roads, mountains, weather, and the quiet scale of the American landscape.',
    id: 'landscape',
    title: 'Landscape',
  },
  {
    albums: [
      album({
        cover: ted1Cover,
        coverSmall: ted1CoverSmall,
        description:
          'A first-birthday session shot in natural light — expressions caught between poses rather than posed for.',
        id: 'teddy12m',
        title: 'Teddy — One Year',
        year: '2017',
      }),
      album({
        cover: ted2Cover,
        coverSmall: ted2CoverSmall,
        description:
          'Six months on and moving constantly. An outdoor session built around keeping up rather than sitting still.',
        id: 'teddy18m',
        title: 'Teddy — 18 Months',
        year: '2018',
      }),
      album({
        cover: beachCover,
        coverSmall: beachCoverSmall,
        description:
          'A maternity session on the coast — open sand, late light, and the quiet between frames.',
        id: 'trudybeachmaternity',
        title: 'Trudy — Beach',
        year: '2019',
      }),
      album({
        cover: snowCover,
        coverSmall: snowCoverSmall,
        description:
          'The winter counterpart to the beach session: bare trees, deep snow, and flat northern light.',
        id: 'trudysnowmaternity',
        title: 'Trudy — Snow',
        year: '2019',
      }),
      album({
        cover: rio1Cover,
        coverSmall: rio1CoverSmall,
        description:
          'Three months old. The longest set in this collection — small gestures, close in, mostly window light.',
        id: 'rio3m',
        title: 'Rio — Three Months',
        year: '2019',
      }),
      album({
        cover: rio2Cover,
        coverSmall: rio2CoverSmall,
        description:
          'Eight months and sitting up. A short session, shot quickly while the mood held.',
        id: 'rio8m',
        title: 'Rio — Eight Months',
        year: '2019',
      }),
      album({
        cover: rio3Cover,
        coverSmall: rio3CoverSmall,
        description:
          'Fifteen months, walking, and entirely uninterested in the camera — which is usually when the good frames arrive.',
        id: 'rio15m',
        title: 'Rio — 15 Months',
        year: '2020',
      }),
    ],
    cardCover: portraitsCardCover,
    cardCoverHeight: 1066,
    cardCoverSmall: portraitsCardCoverSmall,
    cardCoverSmallHeight: 534,
    cover: portraitsCategoryCover,
    coverHeight: 3265,
    coverWidth: 4898,
    description: 'Families, milestones, and candid moments shaped by natural light.',
    id: 'portraits',
    title: 'Portraits',
  },
  {
    albums: [
      album({
        cover: animalsCover,
        coverSmall: animalsCoverSmall,
        description:
          'Wildlife and domestic characters met on the road and close to home — patient waiting, occasionally rewarded.',
        id: 'animals',
        title: 'Animals',
      }),
    ],
    cardCover: animalsCover,
    cardCoverHeight: 1066,
    cardCoverSmall: animalsCoverSmall,
    cardCoverSmallHeight: 534,
    cover: animalsCover,
    coverHeight: 1066,
    coverWidth: 1600,
    description: 'Wildlife and domestic characters encountered close to home and far away.',
    directAlbum: 'animals',
    id: 'animals',
    title: 'Animals',
  },
  {
    albums: [
      album({
        cover: miscCover,
        coverSmall: miscCoverSmall,
        description:
          'Frames that never belonged to a trip or a session — small observations kept because they held up.',
        id: 'misc',
        title: 'Miscellaneous',
      }),
    ],
    cardCover: miscCover,
    cardCoverHeight: 1030,
    cardCoverSmall: miscCoverSmall,
    cardCoverSmallHeight: 516,
    cover: miscCover,
    coverHeight: 1030,
    coverWidth: 1600,
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
