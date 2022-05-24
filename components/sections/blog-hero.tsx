import classNames from "classnames";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import CustomLink from "../common/custom-link";

const TopicList = ({ topicInfos }) => {
  const translation = useTranslation();
  if (topicInfos) {
    const { topics, currentTopic } = topicInfos;
    if (topics && topics.length) {
      const { t } = translation;

      return (
        <div className="menu-banner">
          <ul className="list-menu">
            <li className="item-menu">
              <CustomLink
                link={{ url: "/blog" }}
                className={classNames("link-item", {
                  "link-blog": currentTopic === t("common:news"),
                })}
              >
                {t("common:news")}
              </CustomLink>
            </li>

            {topics.map((topic: any, index: number) => {
              return (
                <li
                  className="item-menu"
                  key={`topic-navigate-${topic.slug}-${index}`}
                >
                  <CustomLink
                    link={{ url: `/blog/${topic.slug}` }}
                    className={classNames("link-item", {
                      "link-blog": currentTopic === topic.slug,
                    })}
                  >
                    {topic.topic}
                  </CustomLink>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }

  return null;
};

const BlogHero = ({ topicInfos }) => {
  const { t } = useTranslation();
  return (
    <section id="banner">
      <div className="container">
        <div className="banner">
          <p className="title-banner">{t("common:news")}</p>
          <p className="breadcrumb-banner">
            <CustomLink link={{ url: "/" }} className="link-home">
              <span className="text-home">Home</span>
            </CustomLink>
            /
            <CustomLink link={{ url: "/blog" }}>
              <span className="text-blog">{t("common:news")}</span>
            </CustomLink>
          </p>
          <TopicList topicInfos={topicInfos} />
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
