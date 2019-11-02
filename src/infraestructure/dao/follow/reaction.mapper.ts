import { ResultSetMapper } from "../result.set.mapper";
import { Reaction } from "../../../dto/post/reaction";

export class ReactionMapper implements ResultSetMapper<Reaction>{

    public map(result: any): Reaction[] {
        let array: Reaction[] = [];

        for (let i = 0; i < result.length; i++) {

            let reaction = new Reaction();
            reaction.id = result[i]["ID"], 
            reaction.uuid = result[i]["UUID"],
            reaction.type = result[i]["TYPE"],
            reaction.uuidPost = result[i]["UUID_POST"],
            reaction.username = result[i]["USERNAME"],
            reaction.created = result[i]["CREATED"],
        
            array.push(reaction);
        }

        return array;
    }
}