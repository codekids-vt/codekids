import { InteractionType } from "../api/models/InteractionType";
import { InteractionsService } from "../api/services/InteractionsService";

export function handleInteraction(
  answer: string,
  correct: boolean,
  timeSpent: number,
  user: number | undefined,
  bookID: number,
  pageID: number,
) {
  try {
    InteractionsService.createInteractionInteractionsPost({
      interaction_type: InteractionType.QUESTION,
      time_since_load: timeSpent,
      user_id: user,
      answer: answer,
      correct: correct,
      bookId: bookID,
      pageId: pageID,
    });
  } catch (error) {
    console.log("Error occured while interacting with database");
  }
}
