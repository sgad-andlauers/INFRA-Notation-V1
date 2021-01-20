/*---------- Déclaration de mes librairies--------*/
import React from "react";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

/*-----------Instanciation des variables globales pour les indices--------*/
const TAB_INDICE_INFRA_SURFACE = [
  { seuilMin: 0, seuilMax: 500, indice: 3 },
  { seuilMin: 500, seuilMax: 1000, indice: -1 },
  { seuilMin: 1000, seuilMax: 2000, indice: -2 },
  { seuilMin: 2000, seuilMax: 5000, indice: -3 },
  { seuilMin: 5000, seuilMax: 10000, indice: -4 },
  { seuilMin: 10000, seuilMax: 100000, indice: -5 }
];
const TAB_INDICE_INFRA_FACES = [
  { seuilMin: 0, seuilMax: 4, indice: 3 },
  { seuilMin: 5, seuilMax: 9, indice: -1 },
  { seuilMin: 10, seuilMax: 100000, indice: -2 }
];
const TAB_INDICE_INFRA_HYPER = [
  { seuilMin: 0, seuilMax: 3, indice: 3 },
  { seuilMin: 4, seuilMax: 7, indice: -2 },
  { seuilMin: 8, seuilMax: 100000, indice: -5 }
];
const TAB_INDICE_INFRA = [
  { seuilMin: 0, seuilMax: 1, indice: 3 },
  { seuilMin: 1, seuilMax: 2, indice: -2 },
  { seuilMin: 2, seuilMax: 3, indice: -3 },
  { seuilMin: 3, seuilMax: 500, indice: -5 }
];
const TAB_INDICE_INFRA_ENTREE_SURFACE = [
  { seuilMin: 1 / 200, seuilMax: 1, indice: 3 },
  { seuilMin: 1 / 500, seuilMax: 1 / 200, indice: -1 },
  { seuilMin: 1 / 1000, seuilMax: 1 / 500, indice: -2 },
  { seuilMin: 0, seuilMax: 1 / 1000, indice: -5 }
];
const TAB_INDICE_INFRA_ENTREE_FACE = [
  { seuilMin: 0, seuilMax: 1, indice: 3 },
  { seuilMin: 1, seuilMax: 2, indice: 2 },
  { seuilMin: 2, seuilMax: 3, indice: 1 },
  { seuilMin: 3, seuilMax: 100, indice: -3 }
];
const INDICE_HALF_LEVEL = -3;
const VE_NB_ETAGE_SUP = 5;
const NB_ETAGE_SUP = -5;
const NB_ETAGE_INF = 0;
const DIST_VE_BAT_INF = 3;
const DIST_VE_BAT_SUP = -3;
const BETON = 3;
const TRADITIONNEL = -1;
const BOIS = -2;
const METAL = -5;
const TBETON = 3;
const TBOIS = -2;
const TMETAL = -5;
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  }
}));

export default function App() {
  /*------- Creation des states avec leurs setter ---------*/
  const classes = useStyles();
  const [surface, setSurface] = React.useState(0);
  const [nbFace, setNbFace] = React.useState(0);
  const [nbHyper, setNbHyper] = React.useState(0);
  const [nbInfra, setNbInfra] = React.useState(0);
  const [typeStructure, setTypeStructure] = React.useState(0);
  const [typeToiture, setTypeToiture] = React.useState(0);
  const [nbEntree, setNbEntree] = React.useState(0);
  const [checkSwitch, setCheckSwitch] = React.useState({
    halfLevel: 0,
    voieEchelle: 0,
    distInf: 0,
    distSup: 0
  });
  const handleTextFieldChange = (event) => {
    console.log("handleTextFieldChange");
    if (event.target.name === "surface") {
      setSurface(Number(event.target.value));
    } else if (event.target.name === "nbFace") {
      setNbFace(Number(event.target.value));
    } else if (event.target.name === "nbHyper") {
      setNbHyper(Number(event.target.value));
    } else if (event.target.name === "nbInfra") {
      setNbInfra(Number(event.target.value));
    } else if (event.target.name === "NbEntree") {
      setNbEntree(Number(event.target.value));
    }
  };
  /*-------- Création des fonction pour récuper et calculer les indices ----------*/
  const getIndiceInfra = (array, value) => {
    let indice = 0;
    array.forEach((item) => {
      if (value > item.seuilMin && value <= item.seuilMax) {
        indice = item.indice;
      }
    });
    return indice;
  };
  const entreeParSurface = nbEntree / surface;
  const entreeParFaces = nbEntree / nbFace;
  const getIndiceHalfLevel = () => {
    let indice;
    if (checkSwitch.halfLevel === 1) {
      indice = INDICE_HALF_LEVEL;
    } else {
      indice = 0;
    }
    return indice;
  };
  const getIndiceVoieEchelle = () => {
    let indice;
    let nbEtage = Number(nbHyper);
    if (checkSwitch.voieEchelle === 1 && nbEtage > 3) {
      indice = VE_NB_ETAGE_SUP;
    } else if (checkSwitch.voieEchelle === 0 && nbEtage > 3) {
      indice = NB_ETAGE_SUP;
    } else if (checkSwitch.voieEchelle === 0 && nbEtage <= 3) {
      indice = NB_ETAGE_INF;
    }
    return indice;
  };
  const getIndiceDistVoieBat = () => {
    let indice;
    if (checkSwitch.distInf === 1) {
      indice = DIST_VE_BAT_SUP;
    } else if (checkSwitch.distSup === 1) {
      indice = DIST_VE_BAT_INF;
    } else {
      indice = 0;
    }
    return indice;
  };
  const indiceSurface = getIndiceInfra(TAB_INDICE_INFRA_SURFACE, surface);
  const indiceNbFace = getIndiceInfra(TAB_INDICE_INFRA_FACES, nbFace);
  const indiceNbHyper = getIndiceInfra(TAB_INDICE_INFRA_HYPER, nbHyper);
  const indiceNbInfra = getIndiceInfra(TAB_INDICE_INFRA, nbInfra);
  const indiceHalfLevel = getIndiceHalfLevel();
  const indiceEntreeSurface = getIndiceInfra(
    TAB_INDICE_INFRA_ENTREE_SURFACE,
    entreeParSurface
  );
  const indiceEntreeFaces = getIndiceInfra(
    TAB_INDICE_INFRA_ENTREE_FACE,
    entreeParFaces
  );
  const indiceVoieEchelle = getIndiceVoieEchelle();
  const indiceDistVoieBat = getIndiceDistVoieBat();
  const indiceIntermediaire =
    indiceSurface +
    indiceNbFace +
    indiceNbHyper +
    indiceNbInfra +
    indiceHalfLevel +
    typeStructure +
    typeToiture +
    indiceEntreeSurface +
    indiceEntreeFaces +
    indiceVoieEchelle +
    indiceDistVoieBat;
  const indiceGeneralInfra = () => {
    let indice;
    if (indiceIntermediaire > 0) {
      indice = "+";
    } else if (indiceIntermediaire <= 0) {
      indice = "-";
    }
    return indice;
  };
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Typography variant="h4">
          Indice du risque Infra : {indiceGeneralInfra()}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Indice du risque Infra numérique : {indiceIntermediaire}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Indice Surface : {indiceSurface}
            </Typography>
            <TextField
              type="number"
              id="surface"
              variant="outlined"
              name="surface"
              value={surface}
              onChange={(event) => {
                handleTextFieldChange(event);
              }}
            />
            <Typography variant="subtitle1">
              Indice Nb de face : {indiceNbFace}
            </Typography>
            <TextField
              type="number"
              id="nbFace"
              variant="outlined"
              name="nbFace"
              value={nbFace}
              onChange={(event) => {
                handleTextFieldChange(event);
              }}
            />
            <Typography variant="subtitle1">
              Indice Nb hyper : {indiceNbHyper}{" "}
            </Typography>
            <TextField
              type="number"
              id="nbHyper"
              variant="outlined"
              name="nbHyper"
              value={nbHyper}
              onChange={(event) => {
                handleTextFieldChange(event);
              }}
            />
            <Typography variant="subtitle1">
              Indice Nb infra: {indiceNbInfra}{" "}
            </Typography>
            <TextField
              type="number"
              id="nbInfra"
              variant="outlined"
              name="nbInfra"
              value={nbInfra}
              onChange={(event) => {
                handleTextFieldChange(event);
              }}
            />
            <Typography variant="subtitle1">
              Indice Techniques 1/2 niveau : {indiceHalfLevel}
            </Typography>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Non</Grid>
              <Grid item>
                <Switch
                  checked={checkSwitch.halfLevel === 1}
                  onChange={(event) => {
                    setCheckSwitch({
                      ...checkSwitch,
                      [event.target.name]: event.target.checked ? 1 : 0
                    });
                  }}
                  name="halfLevel"
                />
              </Grid>
              <Grid item>Oui</Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Indice type de structure (murs): {typeStructure}
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="typeStructure">type de structure</InputLabel>
              <Select
                labelId="typeStructure"
                value={typeStructure}
                onChange={(event) => setTypeStructure(event.target.value)}
                variant="outlined"
              >
                <MenuItem value={0}>
                  <em></em>
                </MenuItem>
                <MenuItem value={BETON}>beton</MenuItem>
                <MenuItem value={TRADITIONNEL}>Traditionnel</MenuItem>
                <MenuItem value={BOIS}>Bois</MenuItem>
                <MenuItem value={METAL}>Metal</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="subtitle1">
              Indice type de toitures : {typeToiture}
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="typeToiture">type de toitures</InputLabel>
              <Select
                labelId="typeToiture"
                value={typeToiture}
                onChange={(event) => setTypeToiture(event.target.value)}
                variant="outlined"
              >
                <MenuItem value={0}>
                  <em></em>
                </MenuItem>
                <MenuItem value={TBETON}>Beton</MenuItem>
                <MenuItem value={TBOIS}>Bois</MenuItem>
                <MenuItem value={TMETAL}>Metal</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="subtitle1">Nombre d'entree</Typography>
            <TextField
              type="number"
              id="NbEntree"
              variant="outlined"
              name="NbEntree"
              value={nbEntree}
              onChange={(event) => {
                handleTextFieldChange(event);
              }}
            />
            <Typography variant="subtitle1">
              Indice Entrée/ surface : {indiceEntreeSurface}
            </Typography>
            <Typography variant="subtitle1">
              Indice entrée / face : {indiceEntreeFaces}
            </Typography>
            <Typography variant="subtitle1">
              Indice voie échelle : {indiceVoieEchelle}
            </Typography>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>non </Grid>
              <Grid item>
                <Switch
                  checked={checkSwitch.voieEchelle === 1}
                  onChange={(event) => {
                    setCheckSwitch({
                      ...checkSwitch,
                      [event.target.name]: event.target.checked ? 1 : 0
                    });
                  }}
                  name="voieEchelle"
                />
              </Grid>
              <Grid item>oui</Grid>
            </Grid>
            <Typography variant="subtitle1">
              Indice distace entre le batiment et voie engin :
              {indiceDistVoieBat}
            </Typography>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Dist inférieur à 50 </Grid>
              <Checkbox
                checked={checkSwitch.distInf === 1}
                onChange={(event) => {
                  setCheckSwitch({
                    ...checkSwitch,
                    [event.target.name]: event.target.checked ? 1 : 0
                  });
                }}
                name="distInf"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <Grid item>Dist suppéieur à 50</Grid>
              <Checkbox
                checked={checkSwitch.distSup === 1}
                onChange={(event) => {
                  setCheckSwitch({
                    ...checkSwitch,
                    [event.target.name]: event.target.checked ? 1 : 0
                  });
                }}
                name="distSup"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
