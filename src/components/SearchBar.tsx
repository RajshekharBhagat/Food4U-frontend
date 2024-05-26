import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});
export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};
const SearchBar = ({ onReset, onSubmit, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        className={`flex items-center flex-1 bg-white gap-3 justify-between flex-row border-2 rounded-full p-3 
                ${form.formState.errors.searchQuery && "border-red-500"}`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-red-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0 flex-1"
                  placeholder={placeHolder}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-full"
          >
            Reset
          </Button>
          <Button type="submit" className="rounded-full bg-red-500">
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;
