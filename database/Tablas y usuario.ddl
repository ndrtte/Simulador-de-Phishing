-- Generado por Oracle SQL Developer Data Modeler 24.3.1.347.1153
--   en:        2026-04-11 17:09:21 CST
--   sitio:      Oracle Database 21c
--   tipo:      Oracle Database 21c



CREATE USER phishing_db_owner IDENTIFIED BY account

unlock;

-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE phishing_db_owner.correos (
    id_correo        NUMBER NOT NULL,
    nombre_remitente VARCHAR2(50 BYTE) NOT NULL,
    correo_remitente VARCHAR2(100 BYTE) NOT NULL,
    asunto           VARCHAR2(150 BYTE) NOT NULL,
    es_phishing      NUMBER(1) NOT NULL,
    cuerpo_correo    CLOB NOT NULL,
    dificultad       NUMBER NOT NULL
)
PCTFREE 10
PCTUSED 40
TABLESPACE users
LOGGING
    STORAGE ( INITIAL 65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT
    )
NO INMEMORY
    LOB ( cuerpo_correo ) STORE AS SECUREFILE (
        TABLESPACE users
        STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS UNLIMITED FREELISTS 1 BUFFER_POOL DEFAULT )
        CHUNK 8192
        RETENTION
        ENABLE STORAGE IN ROW
        NOCACHE LOGGING
    );

CREATE UNIQUE INDEX phishing_db_owner.correos_pk ON
    phishing_db_owner.correos (
        id_correo
    ASC )
        TABLESPACE users PCTFREE 10
            STORAGE (
                INITIAL
            65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE phishing_db_owner.correos
    ADD CONSTRAINT correos_pk PRIMARY KEY ( id_correo )
        USING INDEX phishing_db_owner.correos_pk;

CREATE TABLE phishing_db_owner.dificultad_correos (
    id_dificultad NUMBER NOT NULL,
    dificultad    VARCHAR2(10 BYTE) NOT NULL
)
PCTFREE 10
PCTUSED 40
TABLESPACE users
LOGGING
    STORAGE ( INITIAL 65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT
    )
NO INMEMORY;

CREATE UNIQUE INDEX phishing_db_owner.dificultad_correos_pk ON
    phishing_db_owner.dificultad_correos (
        id_dificultad
    ASC )
        TABLESPACE users PCTFREE 10
            STORAGE (
                INITIAL
            65536 NEXT 1048576 PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS 2147483645 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE phishing_db_owner.dificultad_correos
    ADD CONSTRAINT dificultad_correos_pk PRIMARY KEY ( id_dificultad )
        USING INDEX phishing_db_owner.dificultad_correos_pk;

CREATE TABLE phishing_db_owner.resultados (
    id_resultado       NUMBER NOT NULL,
    tasa_deteccion     NUMBER NOT NULL,
    tasa_error         NUMBER NOT NULL,
    cantidad_correctos NUMBER NOT NULL,
    cantidad_email     NUMBER NOT NULL,
    fecha_creacion     DATE NOT NULL,
    dificultad_correo  NUMBER NOT NULL
)
PCTFREE 10
PCTUSED 40
TABLESPACE users
LOGGING
    STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS UNLIMITED FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
NO INMEMORY;

CREATE UNIQUE INDEX phishing_db_owner.resultados_pk ON
    phishing_db_owner.resultados (
        id_resultado
    ASC )
        TABLESPACE users PCTFREE 10
            STORAGE (
                PCTINCREASE
            0 MINEXTENTS 1 MAXEXTENTS UNLIMITED FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE phishing_db_owner.resultados
    ADD CONSTRAINT resultados_pk PRIMARY KEY ( id_resultado )
        USING INDEX phishing_db_owner.resultados_pk;

ALTER TABLE phishing_db_owner.correos
    ADD CONSTRAINT correos_dificultad_correos_fk
        FOREIGN KEY ( dificultad )
            REFERENCES phishing_db_owner.dificultad_correos ( id_dificultad )
            NOT DEFERRABLE;

ALTER TABLE phishing_db_owner.resultados
    ADD CONSTRAINT resultados_dificultad_fk
        FOREIGN KEY ( dificultad_correo )
            REFERENCES phishing_db_owner.dificultad_correos ( id_dificultad )
            NOT DEFERRABLE;

CREATE SEQUENCE phishing_db_owner.correos_id_correo_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER phishing_db_owner.correos_id_correo_trg BEFORE
    INSERT ON phishing_db_owner.correos
    FOR EACH ROW
    WHEN ( new.id_correo IS NULL )
BEGIN
    :new.id_correo := phishing_db_owner.correos_id_correo_seq.nextval;
END;
/



-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                             3
-- CREATE INDEX                             3
-- ALTER TABLE                              5
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           1
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          1
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              1
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
