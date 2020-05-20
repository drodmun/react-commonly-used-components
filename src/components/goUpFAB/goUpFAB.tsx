import React, { memo, createRef, ReactElement, useEffect, useState } from 'react';
import { Fab, makeStyles, Theme, Slide } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1
  }
}));

type GoUpFABProps = {
  icon?: ReactElement;
};

const GoUpFAB = (props: GoUpFABProps): ReactElement => {
  const classes = useStyles();
  const referenceToGoUpFAB = createRef<HTMLButtonElement>();

  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener('scroll', () =>
      setVisible((document.documentElement.scrollTop || document.body.scrollTop) > 0)
    );

    return () => {
      window.removeEventListener('scroll', () =>
        setVisible((document.documentElement.scrollTop || document.body.scrollTop) > 0)
      );
    };
  }, [referenceToGoUpFAB]);

  const handleGoUp = () => {
    const scroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (scroll > 0) {
      const scrollNextPosition = scroll / 8;
      window.requestAnimationFrame(handleGoUp);
      window.scrollTo(0, scroll - scrollNextPosition);
    }
  };

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Fab ref={referenceToGoUpFAB} color="primary" aria-label="GoUpFAB" className={classes.fab} onClick={handleGoUp}>
        {props.icon || <ArrowUpwardIcon />}
      </Fab>
    </Slide>
  );
};

export default memo(GoUpFAB);
