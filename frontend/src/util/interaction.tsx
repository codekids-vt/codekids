import { InteractionType } from "../api/models/InteractionType";
import { InteractionsService } from "../api/services/InteractionsService";

export function handleInteraction(correct: string,timeSpent: number, user: number | undefined){
    InteractionsService.createInteractionInteractionsPost({
      interaction_type: InteractionType.QUESTION,
      time_since_load: timeSpent,
      user_id: user,
      answer: correct,
    })
  }