"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const kurs_url = "http://localhost/hoffmann-295/src/backend/kurse.php";

export default function KursCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    kursNummer: "",
    kursThema: "",
    kursInhalt: "",
    nr_dozent: "",
    startdatum: "",
    enddatum: "",
    dauer_in_tagen: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.create(formData, kurs_url);
      router.push("/kurse");
    } catch {
      alert("Fehler beim Erstellen");
    }
  };

  return (
    <main className="p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader><CardTitle>Neuen Kurs erfassen</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Thema</Label>
              <Input required onChange={(e) => setFormData({...formData, kursThema: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Dozent ID (Nr)</Label>
                <Input type="number" onChange={(e) => setFormData({...formData, nr_dozent: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Dauer (Tage)</Label>
                <Input type="number" onChange={(e) => setFormData({...formData, dauer_in_tagen: parseInt(e.target.value)})} />
              </div>
            </div>
            <Button type="submit" className="w-full">Kurs anlegen</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}