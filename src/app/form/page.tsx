// pages/form.tsx
"use client";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

const FormPage = () => {
  useEffect(() => {
    const insertData = async () => {
      const { error } = await supabase.from("posts").insert([{ id: 1, name: "Denmark" }]);
      if (error) {
        throw error;
      }
    };

    insertData();
  }, []);

  return <div>FormPageTest</div>;
};

export default FormPage;
