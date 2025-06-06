'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FussballData, FussballKindsData, FussballCompetitionsData } from '@/lib/types';

export function LigaSelection() {
  const [data, setData] = useState<FussballData | null>(null);
  const [kindsData, setKindsData] = useState<FussballKindsData | null>(null);
  const [competitionsData, setCompetitionsData] = useState<FussballCompetitionsData | null>(null);
  const [selectedMandant, setSelectedMandant] = useState<string>('');
  const [selectedSaison, setSelectedSaison] = useState<string>('');
  const [selectedCompetitionType, setSelectedCompetitionType] = useState<string>('');
  const [selectedMannschaftsart, setSelectedMannschaftsart] = useState<string>('');
  const [selectedSpielklasse, setSelectedSpielklasse] = useState<string>('');
  const [selectedGebiet, setSelectedGebiet] = useState<string>('');
  const [selectedCompetition, setSelectedCompetition] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.fussball.de/wam_base.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchKindsData = async () => {
      if (selectedMandant && selectedSaison && selectedCompetitionType) {
        const url = `https://www.fussball.de/wam_kinds${selectedMandant}${selectedSaison}${selectedCompetitionType}.json`;
        try {
          const response = await fetch(url);
          const jsonData = await response.json();
          setKindsData(jsonData);
        } catch (error) {
          console.error('Error fetching kinds data:', error);
        }
      }
    };

    fetchKindsData();
  }, [selectedMandant, selectedSaison, selectedCompetitionType]);

  useEffect(() => {
    const fetchCompetitionsData = async () => {
      if (selectedMandant && selectedSaison && selectedCompetitionType && 
          selectedMannschaftsart && selectedSpielklasse && selectedGebiet) {
        const url = `https://www.fussball.de/wam_competitions${selectedMandant}${selectedSaison}${selectedCompetitionType}${selectedMannschaftsart}${selectedSpielklasse}${selectedGebiet}.json`;
        try {
          const response = await fetch(url);
          const jsonData = await response.json();
          setCompetitionsData(jsonData);
        } catch (error) {
          console.error('Error fetching competitions data:', error);
        }
      }
    };

    fetchCompetitionsData();
  }, [selectedMandant, selectedSaison, selectedCompetitionType, 
      selectedMannschaftsart, selectedSpielklasse, selectedGebiet]);

  // Reset dependent dropdowns when parent selection changes
  useEffect(() => {
    setSelectedSaison('');
    setSelectedCompetitionType('');
    setSelectedMannschaftsart('');
    setSelectedSpielklasse('');
    setSelectedGebiet('');
    setSelectedCompetition('');
  }, [selectedMandant]);

  useEffect(() => {
    setSelectedCompetitionType('');
    setSelectedMannschaftsart('');
    setSelectedSpielklasse('');
    setSelectedGebiet('');
    setSelectedCompetition('');
  }, [selectedSaison]);

  useEffect(() => {
    setSelectedMannschaftsart('');
    setSelectedSpielklasse('');
    setSelectedGebiet('');
    setSelectedCompetition('');
  }, [selectedCompetitionType]);

  useEffect(() => {
    setSelectedSpielklasse('');
    setSelectedGebiet('');
    setSelectedCompetition('');
  }, [selectedMannschaftsart]);

  useEffect(() => {
    setSelectedGebiet('');
    setSelectedCompetition('');
  }, [selectedSpielklasse]);

  useEffect(() => {
    setSelectedCompetition('');
  }, [selectedGebiet]);

  const getMandantKey = (key: string) => key.replace('_', '');
  const getSaisonKey = (key: string) => key.replace('_', '');
  const getMannschaftsartKey = (key: string) => key.replace('_', '');
  const getSpielklasseKey = (key: string) => key.replace('_', '');
  const getGebietKey = (key: string) => key.replace('_', '');

  const isFormComplete = selectedMandant && 
    selectedSaison && 
    selectedCompetitionType && 
    selectedMannschaftsart && 
    selectedSpielklasse && 
    selectedGebiet && 
    selectedCompetition;

  const handleSubmit = async () => {
    const composedUrl = selectedCompetition
      .replace('_', '')
      .replace('spieltagsuebersicht', 'spieltag');
    try {
      const response = await fetch('/api/getSpieltageFromUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: composedUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to process URL');
      }

      const data = await response.json();
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Wer pfeift wo?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* First set of dropdowns */}
          <div className="space-y-4">
            {/* Mandant Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Verband auswählen</label>
              <Select value={selectedMandant} onValueChange={setSelectedMandant}>
                <SelectTrigger>
                  <SelectValue placeholder="Verband auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {data?.Mandanten && Object.entries(data.Mandanten).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Saison Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Saison auswählen</label>
              <Select 
                value={selectedSaison} 
                onValueChange={setSelectedSaison}
                disabled={!selectedMandant}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Saison auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {selectedMandant && data?.Saisons[getMandantKey(selectedMandant)] && 
                    Object.entries(data.Saisons[getMandantKey(selectedMandant)]).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            {/* Competition Type Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Wettbewerb auswählen</label>
              <Select 
                value={selectedCompetitionType} 
                onValueChange={(value) => {
                  setSelectedCompetitionType(value);        
                }}
                disabled={!selectedSaison}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wettbewerb auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {selectedMandant && selectedSaison && 
                    data?.CompetitionTypes[getMandantKey(selectedMandant)]?.[getSaisonKey(selectedSaison)] &&
                    Object.entries(data.CompetitionTypes[getMandantKey(selectedMandant)][getSaisonKey(selectedSaison)]).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Second set of dropdowns */}
          <div className="space-y-4 pt-4 border-t">
            {/* Mannschaftsart Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Mannschaftsart auswählen</label>
              <Select 
                value={selectedMannschaftsart} 
                onValueChange={setSelectedMannschaftsart}
                disabled={!selectedCompetitionType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Mannschaftsart auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {kindsData?.Mannschaftsart && 
                    Object.entries(kindsData.Mannschaftsart).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            {/* Spielklasse Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Spielklasse auswählen</label>
              <Select 
                value={selectedSpielklasse} 
                onValueChange={setSelectedSpielklasse}
                disabled={!selectedMannschaftsart}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Spielklasse auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {selectedMannschaftsart && kindsData?.Spielklasse[getMannschaftsartKey(selectedMannschaftsart)] && 
                    Object.entries(kindsData.Spielklasse[getMannschaftsartKey(selectedMannschaftsart)]).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            {/* Gebiet Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Gebiet auswählen</label>
              <Select 
                value={selectedGebiet} 
                onValueChange={(value) => {
                  setSelectedGebiet(value);
                  console.log('Selected Gebiet:', value);
                }}
                disabled={!selectedSpielklasse}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Gebiet auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {selectedMannschaftsart && selectedSpielklasse && 
                    kindsData?.Gebiet[getMannschaftsartKey(selectedMannschaftsart)]?.[getSpielklasseKey(selectedSpielklasse)] &&
                    Object.entries(kindsData.Gebiet[getMannschaftsartKey(selectedMannschaftsart)][getSpielklasseKey(selectedSpielklasse)]).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            {/* Competition Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Staffel auswählen</label>
              <Select 
                value={selectedCompetition} 
                onValueChange={(value) => {
                  setSelectedCompetition(value);
                }}
                disabled={!selectedGebiet}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Staffel auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {selectedSpielklasse && selectedGebiet && 
                    competitionsData?.[getSpielklasseKey(selectedSpielklasse)]?.[getGebietKey(selectedGebiet)] &&
                    Object.entries(competitionsData[getSpielklasseKey(selectedSpielklasse)][getGebietKey(selectedGebiet)]).map(([url, name]) => (
                      <SelectItem key={url} value={url}>
                        {name}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              className="w-full" 
              disabled={!isFormComplete}
              onClick={handleSubmit}
            >
              Weiter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 