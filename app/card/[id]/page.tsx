"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCardStore } from "@/stores/useCardStore";
import { useCardListStore } from "@/stores/useCardListStore";
import { useCardAutoSave } from "@/hooks/useCardAutoSave";
import { loadCardData } from "@/lib/card-storage";
import { CardEditor } from "@/components/card/CardEditor";
import { PageTransition } from "@/components/ui/PageTransition";

export default function CardEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const loadCard = useCardStore((s) => s.loadCard);
  const resetCard = useCardStore((s) => s.resetCard);
  const cardId = useCardStore((s) => s.cardId);
  const [loaded, setLoaded] = useState(false);

  useCardAutoSave();

  useEffect(() => {
    const data = loadCardData(id);
    if (data) {
      loadCard(data);
      setLoaded(true);
    } else {
      router.replace("/");
    }

    return () => resetCard();
  }, [id, loadCard, resetCard, router]);

  if (!loaded || !cardId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-soft-brown font-kalam text-lg animate-pulse">
          Loading your card...
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-2 bg-parchment/80 backdrop-blur-sm border-b border-soft-brown/20">
          <Link
            href="/"
            className="text-soft-brown hover:text-foreground transition-colors text-lg"
          >
            &larr;
          </Link>
          <h1 className="font-patrick-hand text-lg text-foreground">
            {useCardListStore.getState().cards.find((c) => c.id === id)?.name || "Card"}
          </h1>
        </div>

        <CardEditor />
      </div>
    </PageTransition>
  );
}
