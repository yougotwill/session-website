import isLive from '@/utils/environment';

const CMS = {
  BLOG_RESULTS_PER_PAGE: 13,
  BLOG_RESULTS_PER_PAGE_TAGGED: 12,
  // NOTE Temporarily disabling ISR until the Contentful API limit is reset on February 16th 2023. [William 07/02/2023]
  CONTENT_REVALIDATE_RATE: false,
};

export default CMS;
