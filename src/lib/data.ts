import { Job } from "./definitions";
import clientPromise from "./mongodb";

export async function fetchJobs(
  searchValue?: string,
  currentPage: number = 1,
): Promise<Job[] | undefined> {
  const PER_PAGE = 10;
  const SKIP_NUMBER = PER_PAGE * (currentPage - 1);

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
          { $skip: SKIP_NUMBER },
          { $limit: PER_PAGE },
        ])
        .toArray();
    } else {
      return coll.find({}).skip(SKIP_NUMBER).limit(PER_PAGE).toArray();
    }
  } catch (e) {
    console.error(e);
  }
}
