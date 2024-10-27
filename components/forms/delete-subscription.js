import { useState } from "react";
import { LoadingSpinner } from "../loading-spinner";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function DeleteSubscription({ loadUser, id, name }) {
  const [enteredName, setEnteredName] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteSubscription = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/subscription/${id}`);
      toast({
        description: "Subscription deleted successfully",
      });
      setLoading(false);
      loadUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-[120px]">
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <p className="text-gray-400 text-md font-semibold mb-3">
            Enter the name {name} of scubscription to delete.
          </p>
          <Input
            className="mb-3"
            defaultValue={enteredName}
            onChange={(e) => setEnteredName(e.target.value)}
          />
          <Button
            variant="destructive"
            className="mb-3"
            disabled={enteredName !== name}
            onClick={deleteSubscription}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
