import React from 'react';
import { useEffect } from 'react';
import FooterComponent from '../../../../components/layout/footer/FooterComponent';
import BlogBanner from '../detail/BlogBanner';
import BlogContent from '../detail/BlogContent';

export default function BlogPage() {
  useEffect(() => window.scroll({top: 0}), [])
  return (
    <div>
      <BlogBanner />
      <BlogContent />
      <FooterComponent />
    </div>
  )
}