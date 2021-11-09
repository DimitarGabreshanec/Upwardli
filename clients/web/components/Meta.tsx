import React from "react";
import Head from "next/head";
import { NEXT_PUBLIC_UPWARDLI_WEB_CONTEXT } from "@upwardli/shared/env";
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

export interface MetaProps extends React.ComponentPropsWithRef<"title"> {
  title?: string;
  description?: string;
}

export const Meta: React.FC<MetaProps> = (props: MetaProps) => {
  const { title, description, ...rest } = props;
  return (
    <>
      <Head>
        {/* <meta charSet="UTF-8" /> */}
        {title ? (
          <title title={title}>{title} - Upwardli</title>
        ) : (
          <title>Upwardli</title>
        )}
        {/* @ts-ignore: NEXT_PUBLIC_UPWARDLI_RUNTIME_CONTEXT is static in the container */}
        {NEXT_PUBLIC_UPWARDLI_WEB_CONTEXT === "embedded" && (
          <meta name="robots" content="noindex" />
        )}
      </Head>
    </>
  );
};

// for future API needs
// export const getServerSideProps: GetServerSideProps = async ({ query }: {title, description: string}) => {
//     const {title, description} = query
//   return {
//     props: {
//       title,
//       description,
//     },
//   };
// };
