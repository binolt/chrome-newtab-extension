import React, {useRef, useState, useEffect} from 'react';

const WeatherIcon = ({name}) => {
    const ImportedIconRef = useRef(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      const importIcon = async () => {
        try {
            ImportedIconRef.current = (await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../../../icons/weather/${name}.svg`)).default;
        } catch (err) {
          // Your own error handling logic, throwing error for the sake of
          // simplicity
          throw err;
        } finally {
          setLoading(false);
        }
      };
      importIcon();
    }, [name]);
  
    if (!loading && ImportedIconRef.current) {
      const { current: ImportedIcon } = ImportedIconRef;
      return <ImportedIcon />;
    }
  
    return null;
}
 
export default WeatherIcon;