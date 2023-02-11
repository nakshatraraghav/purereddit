import { firestore } from "@/firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";

import { Community } from "@/atoms/communities";

import NotFound from "@/components/Community/NotFound";
import CreatePostLink from "@/components/Community/CreatePostLink"

import safeJsonStringify from "safe-json-stringify";
import { Fragment } from "react";
import Header from "@/components/Community/Header";
import PageLayout from "@/layouts/PageLayout";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <NotFound />;
  }
  return (
    <Fragment>
      <Header communityData={communityData} />
      <PageLayout>
        <Fragment>
          <CreatePostLink />
        </Fragment>
        <Fragment>
          <div>Right Container</div>
        </Fragment>
      </PageLayout>
    </Fragment>
  );
};

// nextjs has a serialization problem with objects
// so we need to use an external library to stringify the data and then parse it

// the reason we are passing id in the object is that the communnityDoc.data()
// function doesnt return an object with id so we need to create an object with the id property

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      ctx.query.id as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        communityData: "",
      },
    };
  }
}

export default CommunityPage;
