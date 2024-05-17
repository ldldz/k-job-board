import { Job } from "./definitions";
import clientPromise from "./mongodb";

export default async function fetchJobs(searchValue?: string) {
  try {
    const client = await clientPromise;
    const coll = client.db("jobBoard").collection<Job>("jobs");

    if (searchValue) {
      return coll
        .aggregate<Job>([
          {
            $search: {
              index: "job_title_index",
              text: {
                query: searchValue,
                path: {
                  wildcard: "*",
                },
              },
            },
          },
        ])
        .toArray();
    }

    return coll.find().toArray();
  } catch (e) {
    console.error(e);
  }
}
