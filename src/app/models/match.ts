export class Match {
  constructor(
    public result: string,
    public referee: string,
    public attendance: string,
    public homeTeam?: { id: number },
    public awayTeam?: { id: number }
  ) {}
}
