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

const album = (
  id: string,
  title: string,
  cover: string,
  coverSmall: string,
  year?: string,
): GalleryAlbum => ({
  cover,
  coverSmall,
  id,
  photographs: (photographs[id] ?? [])
    .filter((photograph) => photograph.src.trim())
    .map((photograph, index) => ({
      ...photograph,
      alt: photograph.alt.trim() || `${title} photograph ${index + 1}`,
    })),
  title,
  year,
});

export const galleryCategories: GalleryCategory[] = [
  {
    albums: [
      album('adirondacks2025', 'Adirondacks', adirondacksCover, adirondacksCoverSmall, '2025'),
      album('rockies2024', 'Rockies', rockiesCover, rockiesCoverSmall, '2024'),
      album('yellowstone2021', 'Yellowstone', yellowstoneCover, yellowstoneCoverSmall, '2021'),
      album('tetons2021', 'Grand Tetons', tetonsCover, tetonsCoverSmall, '2021'),
      album('alaska2020', 'Alaska', alaska2020Cover, alaska2020CoverSmall, '2020'),
      album('mammoth2020', 'Mammoth', mammothCover, mammothCoverSmall, '2020'),
      album('yosemite2019', 'Yosemite', yosemiteCover, yosemiteCoverSmall, '2019'),
      album('malabar2019', 'Malabar', malabarCover, malabarCoverSmall, '2019'),
      album('roadtrip2018', 'American Roadtrip', roadtripCover, roadtripCoverSmall, '2018'),
      album('alaska2018', 'Alaska', alaska2018Cover, alaska2018CoverSmall, '2018'),
      album('summer2017', 'Summer', summerCover, summerCoverSmall, '2017'),
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
      album('teddy12m', 'Teddy — One Year', ted1Cover, ted1CoverSmall, '2017'),
      album('teddy18m', 'Teddy — 18 Months', ted2Cover, ted2CoverSmall, '2018'),
      album('trudybeachmaternity', 'Trudy — Beach', beachCover, beachCoverSmall, '2019'),
      album('trudysnowmaternity', 'Trudy — Snow', snowCover, snowCoverSmall, '2019'),
      album('rio3m', 'Rio — Three Months', rio1Cover, rio1CoverSmall, '2019'),
      album('rio8m', 'Rio — Eight Months', rio2Cover, rio2CoverSmall, '2019'),
      album('rio15m', 'Rio — 15 Months', rio3Cover, rio3CoverSmall, '2020'),
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
    albums: [album('animals', 'Animals', animalsCover, animalsCoverSmall)],
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
    albums: [album('misc', 'Miscellaneous', miscCover, miscCoverSmall)],
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

export const getAlbumLocation = (albumId?: string) => {
  if (!albumId) return undefined;

  for (const category of galleryCategories) {
    const matchingAlbum = category.albums.find((entry) => entry.id === albumId);
    if (matchingAlbum) return { album: matchingAlbum, category };
  }

  return undefined;
};
