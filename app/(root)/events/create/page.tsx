import EventForm from "@/components/shared/forms/event-form";
import { auth } from "@clerk/nextjs";
import React from "react";

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Criar um novo Evento
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Criar" />
      </div>
    </>
  );
};

export default CreateEvent;
