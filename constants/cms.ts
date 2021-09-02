import isLive from '@/utils/environment';

const CMS = {
  BLOG_RESULTS_PER_PAGE: 13,
  BLOG_RESULTS_PER_PAGE_TAGGED: 12,
  // Next.js will attempt to re-generate the page when a request comes in
  // hourly for the main site and every 30 seconds for staging
  CONTENT_REVALIDATE_RATE: isLive() ? 3600 : 30,
};

export default CMS;
