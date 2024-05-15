import { Job } from "./definitions";
import clientPromise from "./mongodb";

export default async function fetchJobs() {
  try {
    const client = await clientPromise;

    const jobs: Job[] = await client
      .db("jobBoard")
      .collection<Job>("jobs")
      .find()
      .toArray();
    return jobs;
  } catch (e) {
    console.error(e);
  }
}
